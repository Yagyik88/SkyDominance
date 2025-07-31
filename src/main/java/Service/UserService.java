package Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Entity.User;
import Exception.UserException;
import Repository.UserRepository;

@Service
public class UserService {
   
	@Autowired
	private UserRepository userRepository;
	
	  public void register(User user) {
		  if(user.getEmail()==null|| user.getEmail().isEmpty()) {
			  throw new UserException("Email is Required");
		  }
		  if(user.getPassword()==null|| user.getPassword().length()<6) {
			  throw new UserException("Password should be atleast 6 characters");
		  }
		  if (userRepository.findByEmail(user.getEmail()) != null) {
		        throw new UserException("Email already registered");
		    }
		  userRepository.save(user); 
	    }
	  
	  public User login(String email, String password) {
	        if (email == null || password == null) {
	            throw new UserException("Email and password must be provided.");
	        }

	        User user = userRepository.findByEmail(email);

	        if (user == null) {
	            throw new UserException("No user found with the given email");
	        }

	        if (!user.getPassword().equals(password)) {
	            throw new UserException("Incorrect password.");
	        }

	        return user;
	    }
	
}
