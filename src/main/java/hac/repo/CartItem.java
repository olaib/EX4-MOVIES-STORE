package hac.repo;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.PositiveOrZero;

import java.io.Serializable;
/***
 * This is the cart item bean class
 * @see CartSessionBean
 */
public class CartItem implements Serializable {
    @NotEmpty(message = "Id is mandatory")
    private Long id;

    @NotEmpty(message = "Title is mandatory")
    private String title;

    private String poster_path;

    @PositiveOrZero(message = "Price must be positive or zero")
    private Double price;
    private String releaseDate;
    private Double voteAverage;
    private Double voteCount;

    public CartItem() {
    }

    public CartItem(Long id,String title, String poster_path, Double price, String releaseDate, Double voteAverage, Double voteCount) {
        this.id = id;
        this.title = title;
        this.poster_path = poster_path;
        this.price = price;
        this.releaseDate = releaseDate;
        this.voteAverage = voteAverage;
        this.voteCount = voteCount;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPoster_path() {
        return poster_path;
    }

    public void setPoster_path(String poster_path) {
        this.poster_path = poster_path;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public Double getVoteAverage() {
        return voteAverage;
    }

    public void setVoteAverage(Double voteAverage) {
        this.voteAverage = voteAverage;
    }

    public Double getVoteCount() {
        return voteCount;
    }

    public void setVoteCount(Double voteCount) {
        this.voteCount = voteCount;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

}
