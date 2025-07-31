package Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class ContactUs {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
	private String name;
    private String email;
    private String phone;
    private String subject;
    
    @Column(length = 1000)
    private String message;
}
