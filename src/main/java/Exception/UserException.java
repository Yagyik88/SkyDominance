package Exception;

public class UserException extends RuntimeException {
        
	String message;
	

	@Override
	public String getMessage() {
		// TODO Auto-generated method stub
		return message;
	}

public UserException(String message) {
	this.message = message;
}
}
