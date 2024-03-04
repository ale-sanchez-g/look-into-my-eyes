// Create an applitools test to visit Quality With Millan website and go over the categories
import { test } from '@playwright/test';
import {
    BatchInfo,
    Configuration,
    VisualGridRunner,
    BrowserType,
    DeviceName,
    ScreenOrientation,
    Eyes,
    Target
} from '@applitools/eyes-playwright';

// Applitools objects to share for all tests
export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: VisualGridRunner;

const links = [
    'https://www.neosprotect.com.au/',
    'https://www.neosprotect.com.au/for-adviser/register-interest-form/',
    'https://www.neosprotect.com.au/faqs/',
    'https://www.neosprotect.com.au/sitemap/',
    'https://www.neosprotect.com.au/about-life-insurance/find-an-adviser/',
    'https://www.neosprotect.com.au/existing-customers/make-a-claim/',
    'https://www.neosprotect.com.au/news/',
    'https://www.neosprotect.com.au/about-life-insurance/getting-covered/',
    'https://www.neosprotect.com.au/for-adviser/covid-19/',
    'https://www.neosprotect.com.au/about-us/our-vision/',
    'https://www.neosprotect.com.au/about-life-insurance/neos-pr1ority/',
    'https://www.neosprotect.com.au/claims-experience/health-f1rst/',
    'https://www.neosprotect.com.au/claims-experience/claims-process/',
    'https://www.neosprotect.com.au/for-adviser/resource-center/',
    'https://www.neosprotect.com.au/for-adviser/qld-adviser-update-may-2021/',
    'https://www.neosprotect.com.au/for-adviser/wa-adviser-update-may-2021/',
    'https://www.neosprotect.com.au/for-adviser/vic-adviser-update-may-2021/',
    'https://www.neosprotect.com.au/for-adviser/nsw-adviser-update-may-2021/',
    'https://www.neosprotect.com.au/about-life-insurance/our-promise/',
    'https://www.neosprotect.com.au/sa-adviser-update-may-2021/',
    'https://www.neosprotect.com.au/existing-customers/',
    'https://www.neosprotect.com.au/thank-you-for-registering-your-interest/',
    'https://www.neosprotect.com.au/about-neos-protection/child-cover/',
    'https://www.neosprotect.com.au/why-choose-us/',
    'https://www.neosprotect.com.au/further-complaints-information/',
    'https://www.neosprotect.com.au/about-neos-protection/',
    'https://www.neosprotect.com.au/about-us/',
    'https://www.neosprotect.com.au/adviser/nsw-adviser-update-november-2021/',
    'https://www.neosprotect.com.au/adviser/sa-adviser-update-november-2021/',
    'https://www.neosprotect.com.au/adviser/wa-adviser-update-november-2021/',
    'https://www.neosprotect.com.au/adviser/qld-adviser-update-november-2021/',
    'https://www.neosprotect.com.au/adviser/vic-adviser-update-november-2021/',
    'https://www.neosprotect.com.au/benefit-fund-update/',
    'https://www.neosprotect.com.au/disclaimer/',
    'https://www.neosprotect.com.au/register-interest/',
    'https://www.neosprotect.com.au/become-a-neos-adviser/',
    'https://www.neosprotect.com.au/income-support-cover/',
    'https://www.neosprotect.com.au/about-neos-protection/critical-illness-cover/',
    'https://www.neosprotect.com.au/adviser/wa-adviser-update-june-2022/',
    'https://www.neosprotect.com.au/adviser/nsw-adviser-update-june-2022/',
    'https://www.neosprotect.com.au/adviser/sa-adviser-update-june-2022/',
    'https://www.neosprotect.com.au/adviser/qld-adviser-update-june-2022/',
    'https://www.neosprotect.com.au/adviser/vic-adviser-update-june-2022/',
    'https://www.neosprotect.com.au/about-life-insurance/',
    'https://www.neosprotect.com.au/adviser/learn/',
    'https://www.neosprotect.com.au/testimonials/',
    'https://www.neosprotect.com.au/financial-services-guide/',
    'https://www.neosprotect.com.au/benefit-fund-update-march-june-2022/',
    'https://www.neosprotect.com.au/neos-colouring-competition-2022-terms-conditions/',
    'https://www.neosprotect.com.au/compliance/',
    'https://www.neosprotect.com.au/adviser/vic-adviser-update-october-2022/',
    'https://www.neosprotect.com.au/adviser/sa-adviser-update-october-2022/',
    'https://www.neosprotect.com.au/adviser/wa-adviser-update-october-2022/',
    'https://www.neosprotect.com.au/adviser/qld-adviser-update-october-2022/',
    'https://www.neosprotect.com.au/adviser/nsw-adviser-update-october-2022/',
    'https://www.neosprotect.com.au/terms-of-use/',
    'https://www.neosprotect.com.au/about-us/our-partners/',
    'https://www.neosprotect.com.au/adviser/',
    'https://www.neosprotect.com.au/claims-experience/',
    'https://www.neosprotect.com.au/the-neos-experience/',
    'https://www.neosprotect.com.au/get-in-touch/',
    'https://www.neosprotect.com.au/privacy-policy/',
    'https://www.neosprotect.com.au/life-insurance-code-practice/',
    'https://www.neosprotect.com.au/tmd/',
    'https://www.neosprotect.com.au/benefit-fund-update-14-november-2023/',
    'https://www.neosprotect.com.au/pds/',
    'https://www.neosprotect.com.au/existing-customers/forms-and-documents/',
    'https://www.neosprotect.com.au/about-neos-protection/life-insurance/',
    'https://www.neosprotect.com.au/about-neos-protection/tpd-cover/',
    'https://www.neosprotect.com.au/about-neos-protection/income-support/',
    'https://www.neosprotect.com.au/adviser/tools-and-support/'
  ]

// This method sets up the configuration for running visual tests in the Ultrafast Grid.
// The configuration is shared by all tests in a test suite, so it belongs in a `beforeAll` method.
// If you have more than one test class, then you should abstract this configuration to avoid duplication.
test.beforeAll(async () => {

    // Create the runner for the Ultrafast Grid.
    // Concurrency refers to the number of visual checkpoints Applitools will perform in parallel.
    // Warning: If you have a free account, then concurrency will be limited to 1.
    Runner = new VisualGridRunner({ testConcurrency: 5 });

    // Create a new batch for tests.
    // A batch is the collection of visual checkpoints for a test suite.
    // Batches are displayed in the Eyes Test Manager, so use meaningful names.
    Batch = new BatchInfo({ name: 'DEMO: NeoLife Crawl' });

    // Create a configuration for Applitools Eyes.
    Config = new Configuration();

    // Set the batch for the config.
    Config.setBatch(Batch);

    // Add 3 desktop browsers with different viewports for cross-browser testing in the Ultrafast Grid.
    // Other browsers are also available, like Edge and IE.
    // Config.addBrowser(800, 600, BrowserType.CHROME);
    Config.addBrowser(1600, 1200, BrowserType.SAFARI);
    Config.addBrowser(1024, 768, BrowserType.CHROME);

    // // Add 2 mobile emulation devices with different orientations for cross-browser testing in the Ultrafast Grid.
    Config.addDeviceEmulation(DeviceName.Pixel_2, ScreenOrientation.PORTRAIT);
    // Config.addDeviceEmulation(DeviceName.Nexus_10, ScreenOrientation.LANDSCAPE);
    // // Add 1 real mobile device
    // Config.addMobileDevice(DeviceName.iPhone_11_Pro_Max, ScreenOrientation.PORTRAIT);
});

test.describe('NeoLife', () => {

    // Test-specific objects
    let eyes: Eyes;

    // This method sets up each test with its own Applitools Eyes object.
    test.beforeEach(async ({ page }) => {

        // Create the Applitools Eyes object connected to the VisualGridRunner and set its configuration.
        eyes = new Eyes(Runner, Config);

        // Open Eyes to start visual testing.
        // Each test should open its own Eyes for its own snapshots.
        // It is a recommended practice to set all four inputs below:
        await eyes.open(

            // The Playwright page object to "watch"
            page,

            // The name of the application under test.
            // All tests for the same app should share the same app name.
            // Set this name wisely: Applitools features rely on a shared app name across tests.
            'NeoLife',

            // The name of the test case for the given application.
            // Additional unique characteristics of the test may also be specified as part of the test name,
            // such as localization information ("Home Page - EN") or different user permissions ("Login by admin"). 
            test.info().title,

            // The viewport size for the local browser.
            // Eyes will resize the web browser to match the requested viewport size.
            // This parameter is optional but encouraged in order to produce consistent results.
            { width: 1024, height: 768 });
    });

    // The interactions use typical Playwright calls,
    // but the verifications use one-line snapshot calls with Applitools Eyes.
    // If the page ever changes, then Applitools will detect the changes and highlight them in the Eyes Test Manager.
    // Traditional assertions that scrape the page for text values are not needed here.
    // test('Sitemap craw neolife', async ({ page }) => {

    //     // Load the Home page
    //     await page.goto('https://www.neosprotect.com.au/page-sitemap.xml');

    //     // capture all the url links from the
    //     const links = await page.$$eval('#sitemap a', (elements) => elements.map((element) => element.textContent));
    //     console.log('Sitemap - links', links);
    //     // As the content will change, we use layout match level
    //     // loop rhough the links and check each page
    //     // for (let i = 0; i < links.length; i++) {
    //     //     console.log('Sitemap - ' + i, links[i]);
    //     //     await page.goto(links[i]);
    //     //     await eyes.setMatchLevel('Layout');
    //     //     await eyes.check('Sitemap - ' + i, Target.window().fully());
    //     // }
    // });

    // loop through the links and check each page using each function
    links.forEach((link, index) => {
        test(`Visit ${link}`, async ({ page }) => {
            await page.goto(link);
            // To handle lazyLoad across different pages
            await page.waitForTimeout(5000);

            // scroll to the bottom of the page
            await page.evaluate(() => {
                window.scrollBy(0, window.innerHeight);
            });

            // To handle lazyLoad across different pages
            await page.waitForTimeout(5000);

            // scroll to the bottom of the page
            await page.evaluate(() => {
                window.scrollBy(0, window.innerHeight);
            });
            // To handle lazyLoad across different pages
            await page.waitForTimeout(5000);
            await eyes.setMatchLevel('Layout');
            await eyes.check('Sitemap - ' + link, Target.window().fully());
        });
    });
    

    // This method performs cleanup after each test.
    test.afterEach(async () => {

        // Close Eyes to tell the server it should display the results.
        await eyes.closeAsync();

        // Warning: `eyes.closeAsync()` will NOT wait for visual checkpoints to complete.
        // You will need to check the Eyes Test Manager for visual results per checkpoint.
        // Note that "unresolved" and "failed" visual checkpoints will not cause the Playwright test to fail.

        // If you want the Playwright test to wait synchronously for all checkpoints to complete, then use `eyes.close()`.
        // If any checkpoints are unresolved or failed, then `eyes.close()` will make the Playwright test fail.
    });
});

test.afterAll(async () => {

    // Close the batch and report visual differences to the console.
    // Note that it forces Playwright to wait synchronously for all visual checkpoints to complete.
    const results = await Runner.getAllTestResults();
    console.log('Visual test =>  ', results);

});