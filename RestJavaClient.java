import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.security.GeneralSecurityException;
import java.security.KeyStore;

// Requires JDK 17 and no external libraries
public class RestJavaClient {

    private static final String URL = "https://web.api.six-group.com";
    private static final String CERTIFICATE = "C:/Users/eugen/Downloads/certificate (1).p12";
    private static final String PASSWORD = "LfWn9540JX2";

    public static void main(String[] args) throws Exception {
        // 1. create mTLS context
        SSLContext sslContext = createSslContextOrFail();

        // 2. create HTTP/2 client with mTLS setup
        HttpClient httpClient = HttpClient.newBuilder().version(HttpClient.Version.HTTP_2).sslContext(sslContext).build();

        // 3. create the request
        /*URI url = URI.create(URL + "/api/findata/v1/instruments/referenceData/instrumentBase?ids=US0378331005&scheme=ISIN");
        HttpRequest request = HttpRequest.newBuilder()
                .uri(url)
                .build();

         */
        String apiRequest = "/api/findata/v1/listings/marketData/intradaySnapshot";
        //URI url = URI.create(URL + apiRequest);
        URI url = URI.create("https://web.api.six-group.com/api/findata/v1/instruments/referenceData/instrumentBase?scheme=COMMONCODE&ids=CH0009980894%2CIE00B5BMR087%2CCH0559601544%2CUS0378331005%2CJE00B1VS3770%2CUS037833AK68%2CXXX&preferredLanguage=EN&extensions=EXPLAIN");
        HttpRequest request = HttpRequest.newBuilder()
                .uri(url)
                .build();


        // 4. send the request (blocking the current thread)
        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        // 5. just show the response
        System.out.println("Test: \n" + response.body());
    }

    private static SSLContext createSslContextOrFail() throws GeneralSecurityException, IOException {
        KeyStore store = KeyStore.getInstance("PKCS12");
        store.load(new FileInputStream(CERTIFICATE), PASSWORD.toCharArray());
        KeyManagerFactory keyManagerFactory = KeyManagerFactory.getInstance("SunX509");
        keyManagerFactory.init(store, PASSWORD.toCharArray());
        SSLContext sslContext = SSLContext.getInstance("TLSv1.2");
        sslContext.init(keyManagerFactory.getKeyManagers(), null, null);
        return sslContext;
    }

}
