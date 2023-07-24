package hac.repo;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Objects;

/***
 * This is the cart bean class instantiated in session
 * @see CartItem
 */
@Component
@SessionScope
public class CartSessionBean implements Serializable {
    /***
     * This is the list of items in the cart
     * @see CartItem
     */
    private ArrayList<CartItem> cart;

    public CartSessionBean() {
        this.cart = new ArrayList<>();
    }

    public ArrayList<CartItem> getCart() {
        return cart;
    }

    public void setCart(ArrayList<CartItem> cart) {
        this.cart = cart;
    }

    public void add(CartItem item) {
        cart.add(item);
    }
    /***
     * Remove item from cart
     * @param id - id of item to remove
     * @return true if item was removed, false otherwise
     */
    public boolean remove(Long id) {
        return cart.removeIf(i -> Objects.equals(i.getId(), id));
    }
    /***
     * Clear cart
     */
    public void clear() {
        cart.clear();
    }

    /***
     * Check if item is already in cart
     * @param item - item to check
     * @return true if item is in cart, false otherwise
     */
    public boolean isExist(CartItem item) {
        return cart.stream().anyMatch(i -> Objects.equals(i.getId(), item.getId()));
    }
}