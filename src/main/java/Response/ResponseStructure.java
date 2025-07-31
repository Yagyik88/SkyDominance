package Response;

import java.time.LocalDate;

import lombok.Data;

@Data
public class ResponseStructure<T> {
  
	private String status;
	private int statusCode;
	private LocalDate date;
	private T obj;
}
