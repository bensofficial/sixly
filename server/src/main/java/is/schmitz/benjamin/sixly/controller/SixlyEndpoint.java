package is.schmitz.benjamin.sixly.controller;

import is.schmitz.benjamin.sixly.controller.dto.ContentDTO;
import is.schmitz.benjamin.sixly.controller.dto.FilterOptions;
import is.schmitz.benjamin.sixly.controller.dto.NewsDTO;
import is.schmitz.benjamin.sixly.controller.dto.PriceEntry;
import org.springframework.ai.azure.openai.AzureOpenAiChatClient;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sixly")
public class SixlyEndpoint {
    public SixlyEndpoint(AzureOpenAiChatClient chatClient) {
        this.chatClient = chatClient;
    }

    @GetMapping("news")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<NewsDTO> getNews() {
        var news = new LinkedList<NewsDTO>();
        news.add(new NewsDTO("Goldman Sachs", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Goldman_Sachs.svg/800px-Goldman_Sachs.svg.png", "Goldman Sachs Asset Management raises $700MM for Union Bridge.\nUnion Bridge offers co-investment opportunities in public and private markets.\nFund sourced from diverse investors; targets unique investment opportunities.", "https://www.gsam.com/content/gsam/global/en/about-gsam/news-and-media/2024/union-bridge-partners-co-investment-strategy.html"));
        news.add(new NewsDTO("Vontobel Fonds Services AG", "https://media.licdn.com/dms/image/D4D10AQE58sj5fTWFLg/videocover-low/0/1708678579134?e=2147483647&v=beta&t=r16_zQxXsLSyniUFrpEsErBF84iRRdlcdu_ZkClig3o", "Raiffeisen evaluates ending Vontobel partnership, causing potential CHF 30M loss.\n10-year collaboration provided significant revenue, but Raiffeisen reconsiders future.\nVontobel faces substantial impact; Raiffeisen rethinks cooperation strategy.", "https://insideparadeplatz.ch/2024/02/20/raiffeisen-vor-kuendigung-des-vontobel-vertriebsdeals/"));
        news.add(new NewsDTO("Amundi Asset Management", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Amundi_logo.svg/1920px-Amundi_logo.svg.png", "Amundi launches low-cost global ETF with 0.07% management fee.\nIntensifying price competition among ETF providers in European market.\nTrend towards lower fees driven by investor demand and competition.", "https://www.dasinvestment.com/amundi-prime-all-country-world-ucits-etf-preisguenstig/"));
        news.add(new NewsDTO("Rothschild & Co Asset Management", "https://cdn.zonebourse.com/static/instruments-logo-5306", "Rothschild & Co Bank seeks to expand with new advisors.\nGrowth strategy includes focus on Swiss retirement solutions.\nPrioritizing long-term client relationships and selective hiring practices.", "https://www.finews.ch/news/banken/61577-rothschild-co-bank-laurent-gagnebin-abschluss-2023-gewinn-neugeld-assets-under-management"));

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

    private final AzureOpenAiChatClient chatClient;


    @GetMapping("ai/generate")
    @CrossOrigin(origins = "http://localhost:3000")
    public Map generate(@RequestParam(value = "message") String message) {
        final String prompt = """
                You are a AI chat bot in the stock information platform sixly.
                sixly is an app for young people, who just got their first income to inform them about investment options.
                In the sixly app users get suggestions for fonds, based on their personal choice of risk, return, and sustainability.
                You are there, to further inform them about investment and to answer any upcoming questions.
                
                We and the users are aware of potential risks of investing, so please, do not overwhelm them with too many warnings, still slight warnings are appropriate.
                
                For example, if the users asks: Hi, I have a question. What are fonds?
                
                You can answer with:
                
                Hey, thanks for using sixly. Sure, I will answer your question.
                Fonds are a set of multiple stocks and other investment options. The stock prices
                influence the price and value of the fond.
                Thus, you have less risk of loosing money, but also have less options to earn money really quick.
                
                Please use an inspiring and energizing tone and talk to them like young adults. The answer should be simple and not too difficult to understand so that future investors are not overwhelmed. Still, it should be correct and provide basic economical insights.
                Do not anwer with a question. Answer with a correct answer.
                If the user does not ask a question, please offer your help.
                
                ### START OF USER MESSAGE ###
                
                """ + message;

        return Map.of("generation", chatClient.call(prompt));
    }
}
