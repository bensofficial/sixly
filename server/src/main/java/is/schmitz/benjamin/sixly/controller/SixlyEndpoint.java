package is.schmitz.benjamin.sixly.controller;

import is.schmitz.benjamin.sixly.controller.dto.ContentDTO;
import is.schmitz.benjamin.sixly.controller.dto.FilterOptions;
import is.schmitz.benjamin.sixly.controller.dto.NewsDTO;
import is.schmitz.benjamin.sixly.controller.dto.PriceEntry;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/api/sixly")
public class SixlyEndpoint {
    @GetMapping("news")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<NewsDTO> getNews() {
        var news = new LinkedList<NewsDTO>();
        news.add(new NewsDTO("Fond 1", "http://localhost/fond1", "News Fond 1"));
        news.add(new NewsDTO("Fond 2", "http://localhost/fond2", "News Fond 2"));
        news.add(new NewsDTO("Fond 3", "http://localhost/fond3", "News Fond 3"));
        news.add(new NewsDTO("Fond 4", "http://localhost/fond4", "News Fond 4"));

        return news;
    }

    @GetMapping("content/{siteID}")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<ContentDTO> getContent(@PathVariable Long siteID, @RequestParam(required = false) String keywords) {
        List<FilterOptions> filterOptions = new LinkedList<>();
        if (keywords != null && keywords.contains("sustainability")) {
            filterOptions.add(FilterOptions.SUSTAINABILITY);
        }
        if (keywords != null && keywords.contains("risk")) {
            filterOptions.add(FilterOptions.RISK);
        }
        if (keywords != null && keywords.contains("return")) {
            filterOptions.add(FilterOptions.RETURN);
        }

        var contents = new LinkedList<ContentDTO>();

        var prices1 = new LinkedList<PriceEntry>();
        prices1.add(new PriceEntry(LocalDateTime.of(2015,
                Month.JULY, 29, 19, 30, 40), 2.5));
        prices1.add(new PriceEntry(LocalDateTime.of(2015,
                Month.AUGUST, 29, 19, 30, 40), 5d));
        prices1.add(new PriceEntry(LocalDateTime.of(2015,
                Month.SEPTEMBER, 29, 19, 30, 40), 8.5));
        contents.add(new ContentDTO("Fond 1 for site " + siteID + filterOptions, "http://localhost/fond1", "Sector", "2.5", prices1));

        var prices2 = new LinkedList<PriceEntry>();
        prices2.add(new PriceEntry(LocalDateTime.of(2015,
                Month.JULY, 29, 19, 30, 40), 200d));
        prices2.add(new PriceEntry(LocalDateTime.of(2015,
                Month.AUGUST, 29, 19, 30, 40), 100d));
        prices2.add(new PriceEntry(LocalDateTime.of(2015,
                Month.SEPTEMBER, 29, 19, 30, 40), 150d));
        contents.add(new ContentDTO("Fond 2 for site " + siteID + filterOptions, "http://localhost/fond2", "Sector", "7.5", prices2));

        return contents;
    }
}
