package hac;

import hac.repo.Purchase;
import hac.repo.PurchaseRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
/**
 * This controller is responsible for managing the purchases.
 * adding/removing purchases
 * clearing purchases
 * @see Purchase
 * @see PurchaseRepository
 */
@RestController
@RequestMapping("/purchase")
@Transactional// for handle race condition
public class PurchaseController {
    /**
     * This is the success message returned when a purchase is added successfully.
     */
    private static final String PURCHASE_SAVED_SUCCESS = "Purchase saved successfully!";
    /**
     * This is the purchase repository bean.
     * @see PurchaseRepository
     */
    @Autowired
    private PurchaseRepository repository;  // this is the JPA repository (SQL database)
    /**
     * This method is used to get all the purchases from the database.
     *
     * @return list of purchases
     */
    @GetMapping("")
    public List<Purchase> showPurchases() {
        return repository.findAll(); // this is a JPA method to get all the purchases
    }

    /**
     * This method is used to add a purchase to the database.
     *
     * @param purchase purchase object
     * @return 200 status code and the success message if the purchase is added successfully
     */
    @PostMapping("")
    public ResponseEntity<Object> addPurchase(@Valid @RequestBody Purchase purchase) {
        repository.save(purchase);
        return ResponseEntity.ok(PURCHASE_SAVED_SUCCESS);
    }

    /**
     * This method handles the exception thrown when the exception is thrown 400 bad request or validation
     * status code is returned;
     *
     * @param ex exception thrown
     * @return 400 status code and the exception message
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({MethodArgumentNotValidException.class, ConstraintViolationException.class})
    public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }

    /**
     * This method handles the exception thrown when the exception is thrown 500 status code is returned;
     *
     * @param e exception
     * @return 500 status code and the exception message
     */
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }
}
