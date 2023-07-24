package hac;

import hac.repo.CartItem;
import hac.repo.CartSessionBean;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/***
 * This controller is responsible for managing the cart session.
 * adding/removing items to/from cart
 * clearing cart session
 * @see CartItem
 * @see CartSessionBean
 */
@RestController
@RequestMapping("/cart")
@Transactional
public class CartSessionController {
    private static final String ALREADY_IN_CART = "Item already in cart";
    private static final String ADDED_TO_CART = "Item added to cart";
    private static final String REMOVED_FROM_CART = "Item removed from cart";
    /***
     * This is the bean that holds the cart session
     * @see CartSessionBean
     */
    @Autowired
    private CartSessionBean cartSessionBean;

    /***
     * This method adds an item to the cart session
     * @param item the item to be added
     * @return ResponseEntity with status code 201 if the item was added successfully
     * or 301 if the item is already in the cart
     */
    @PostMapping("/")
    public ResponseEntity<String> add(@RequestBody CartItem item) {
        if (cartSessionBean.isExist(item)) {
            return ResponseEntity.status(301).body(ALREADY_IN_CART);
        }
        cartSessionBean.add(item);
        return ResponseEntity.created(null).body(ADDED_TO_CART);
    }

    /***
     * This method removes an item from the cart session
     * @param id the id of the item to be removed
     * @return ResponseEntity with status code 200 if the item was removed successfully
     * or 404 if the item was not found in the cart
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> remove(@PathVariable Long id) {
        if (!cartSessionBean.remove(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(REMOVED_FROM_CART);
    }

    /***
     * This method clears the cart session
     * @return ResponseEntity with status code 200
     */
    @DeleteMapping("/")
    public ResponseEntity<String> clear() {
        cartSessionBean.clear();
        return ResponseEntity.ok().body(REMOVED_FROM_CART);
    }

    /***
     * This method removes multiple items from the cart session
     * @param items list of ids of items to be removed
     * @return ResponseEntity with status code 200
     */
    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestBody ArrayList<Integer> items) {
        for (int id : items) {
            cartSessionBean.remove((long) id);
        }
        return ResponseEntity.ok().body(REMOVED_FROM_CART);
    }
    /***
     * This method returns the cart session
     * @return ResponseEntity with status code 200 and the cart session
     */
    @GetMapping("/")
    public ResponseEntity<ArrayList<CartItem>> get() {
        return ResponseEntity.ok(cartSessionBean.getCart());
    }
    /***
     * This method handles validation exceptions and bad requests
     * @param ex - exception to handle
     * @return map of errors
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
}