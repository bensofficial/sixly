package is.schmitz.benjamin.sixly.controller.dto;

import java.time.LocalDateTime;

public record PriceEntry(LocalDateTime date, Double price) {
}
