package Exception;

import java.time.LocalDate;

import org.apache.catalina.connector.Response;
import org.springframework.boot.autoconfigure.graphql.GraphQlProperties.Http;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import Response.ResponseStructure;

@ControllerAdvice
public class UserExceptionHandler {
     
	@ExceptionHandler
	public ResponseEntity<ResponseStructure<String>> userException(UserException ue){
		ResponseStructure<String> rs = new ResponseStructure<String>();
		rs.setStatus("Fail");
		rs.setStatusCode(HttpStatus.BAD_REQUEST.value());
		rs.setDate(LocalDate.now());
		rs.setObj(ue.getMessage());
		
		return new ResponseEntity<>(rs, HttpStatus.BAD_REQUEST);
	}
}
