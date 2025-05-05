package com.ecommerce.webstore_app.payload;

import lombok.Data;

@Data
public class StripePaymentDTO {

    private long amount;
    private String currency;

}
