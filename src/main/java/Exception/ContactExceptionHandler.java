package Exception;

import java.time.LocalDate;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import Response.ResponseStructure;

@ControllerAdvice
public class ContactExceptionHandler {

	@ExceptionHandler(ContactException.class)
	 public ResponseEntity<ResponseStructure<String>> handleContactException(ContactException ce) {
        ResponseStructure<String> rs = new ResponseStructure<>();
        rs.setStatus("Fail");
        rs.setStatusCode(HttpStatus.BAD_REQUEST.value());
        rs.setDate(LocalDate.now());
        rs.setObj(ce.getMessage());

        return new ResponseEntity<>(rs, HttpStatus.BAD_REQUEST);
	}
}
