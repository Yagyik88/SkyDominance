package Controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Entity.User;
import Response.ResponseStructure;
import Service.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {

	 @Autowired
	    private UserService userService;
	 
	  @PostMapping("/signup")
	    public ResponseEntity<ResponseStructure<String>> signup(@RequestBody User user) {
	        userService.register(user);

	        ResponseStructure<String> rs = new ResponseStructure<>();
	        rs.setStatus("Success");
	        rs.setStatusCode(201);
	        rs.setDate(LocalDate.now());
	        rs.setObj("Signup successful for: " + user.getEmail());

	        return ResponseEntity.status(201).body(rs);
	    }

	    @PostMapping("/login")
	    public ResponseEntity<ResponseStructure<String>> login(@RequestBody User user) {
	        User existing = userService.login(user.getEmail(), user.getPassword());

	        ResponseStructure<String> rs = new ResponseStructure<>();
	        rs.setStatus("Success");
	        rs.setStatusCode(200);
	        rs.setDate(LocalDate.now());
	        rs.setObj("Login successful. Welcome " + existing.getName());

	        return ResponseEntity.ok(rs);
	    }
}
