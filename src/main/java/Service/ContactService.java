package Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Exception.ContactException;
import Repository.ContactRepository;


@Service
public class ContactService {

	@Autowired
	private ContactRepository contactrepo;
	  public Entity.ContactUs saveMessage(Entity.ContactUs contact) {
	        if (contact.getName() == null || contact.getName().isEmpty()) {
	            throw new ContactException("Name is required");
	        }
	        if (contact.getEmail() == null || contact.getEmail().isEmpty()) {
	            throw new ContactException("Email is required");
	        }
	        if (contact.getMessage() == null || contact.getMessage().isEmpty()) {
	            throw new ContactException("Message is required");
	        }
            return contactrepo.save(contact);
//	        return contactrepo.save(contact);
	    }
}
