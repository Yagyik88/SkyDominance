package Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Entity.ContactUs;

@Repository
public interface ContactRepository extends JpaRepository<ContactUs, Long> {

}
