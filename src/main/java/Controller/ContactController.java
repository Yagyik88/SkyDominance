package Controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Entity.ContactUs;
import Response.ResponseStructure;
import Service.ContactService;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {
	    
	     @Autowired
	    private ContactService contactService;

	    @PostMapping("/submit")
	    public ResponseEntity<ResponseStructure<String>> submitContact(@RequestBody ContactUs contact) {
	        contactService.saveMessage(contact);

	        ResponseStructure<String> rs = new ResponseStructure<>();
	        rs.setStatus("Success");
	        rs.setStatusCode(201);
	        rs.setDate(LocalDate.now());
	        rs.setObj("Message submitted. Thank you " + contact.getName());

	        return ResponseEntity.status(201).body(rs);
	    }
	
}
