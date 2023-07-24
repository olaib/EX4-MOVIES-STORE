package hac.repo;

import org.springframework.data.jpa.repository.JpaRepository;

/***
 * This interface is a JPA repository.
 * It is used to perform CRUD operations on the database.
 *
 */
public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    // Find  by email
    Purchase findByEmail(String email);

    // Find by id
    Purchase findById(long id);

    //Find by first name and last name
    Purchase findByFirstNameAndLastName(String firstName, String lastName);

    //Find by first name
    Purchase findByFirstName(String firstName);

    //Find by last name
    Purchase findByLastName(String lastName);

}
