package Exception;

public class ContactException extends RuntimeException {

	String message;
	
	public ContactException(String message) {
		this.message=message;
	}
	
	@Override
	public String getMessage() {
		// TODO Auto-generated method stub
		return message;
	}
}
