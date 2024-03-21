package is.schmitz.benjamin.sixly.controller.dto;

import java.util.List;

public record ContentDTO(String fond, String logoUrl, String sector, String score, List<PriceEntry> prices) {
}
