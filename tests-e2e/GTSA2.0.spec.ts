
// =====================================================================
//
// Name: END To END - Net New Eform Creation
// Description: Create new Net New Eform and generate PDF
// 01. Navigate to GTSA 2.0 UAT
// 02. Search for a Company ID 
// 03. Create New eForm
// 04. Update all mandatory details
// 05. Generate PDF file
//
// =====================================================================
import { test, expect, type Page } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
import { PowerAppsUSSearchDashboard,PowerAppsAlertWindow,PowerAppsCommonComponents,PowerAppsListSelector,subAreaMenuSelectors, viewSelectors, 
  gridSelectors, FormControlSelectors} from "../selectors/PowerAppsSelectors.json";
import { getCSVData, navigateToApps, stringFormat, waitUntilAppIdle } from '../utils/common';
import { allure } from 'allure-playwright';
import { Severity } from "allure-js-commons";
import { addAccount } from '../selectors/testcommonfunction/eform';

const customerID:any= process.env.CUSTOMERID?.toString();
const profileID:any= process.env.PROFILEID?.toString();
  test.describe('E2E GTSA 2.0 eForm Creation', () => {
    test.describe.configure({ mode: 'serial' });
    let appId = process.env.CSH_APPID as string;
    test.beforeEach(async ({ page }) => {
      await navigateToApps(page, stringFormat(appId) ,'GTSA 2.0 ');
    });
    //const testData =getCSVData('testcase');
  test('01.Search for ACI migrated Profile', async ({ page },testInfo) => {
  //Search for profile
    await waitUntilAppIdle(page);
    const frame =page.frameLocator(stringFormat(PowerAppsUSSearchDashboard.frmDashboard,'WebResource_WebResource_bobauscustomersearch-'));
    await frame.locator(stringFormat(PowerAppsUSSearchDashboard.btnCompanyID)).click();
    await frame.locator(stringFormat(PowerAppsUSSearchDashboard.ddCompanyId)).click();
    await frame.locator(stringFormat(PowerAppsUSSearchDashboard.txtSearchCustomerInput)).fill(profileID);
    await frame.locator(stringFormat(PowerAppsUSSearchDashboard.btnSearch)).click();
    await expect(frame.locator(stringFormat(PowerAppsUSSearchDashboard.tblCompanyId))).toHaveText(profileID, { timeout: 10000 });
    //const screenshot =await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
  //  testinfo.attach(testinfo.title,{ body: screenshot, contentType: 'image/png'} );
    await frame.locator(stringFormat(PowerAppsUSSearchDashboard.tblCompanyId)).waitFor({state:'visible'});
    let profileDetails = frame.locator(stringFormat(PowerAppsUSSearchDashboard.tblCompanyId));
    await profileDetails.waitFor({state:'attached'});
    await allure.description(
      "GTSA 2.0 maintenance company id search.",
    );
    await allure.owner("Muthu");
    await allure.tags("Maintenacen", "BBP");
    await allure.severity(Severity.CRITICAL);
    await allure.link("https://example.com/docs", "Related Documentation");
    await allure.issue("AUTH-123", "https://example.com/issues/AUTH-123");
    
  });
  
    test('02.Create GTSA 2.0 Net New eForm', async ({ page },testInfo) => {
    let testData: any;
    await getCSVData(testInfo.title,'testcase').then((value)=>{testData =JSON.parse(value)});
    //Create profile
    await waitUntilAppIdle(page);
    const frame =page.frameLocator(stringFormat(PowerAppsUSSearchDashboard.frmDashboard,'WebResource_WebResource_bobauscustomersearch-'));
    await frame.locator(stringFormat(PowerAppsUSSearchDashboard.txtSearchCustomerInput)).fill(customerID);
    await frame.locator(stringFormat(PowerAppsUSSearchDashboard.btnSearch)).click();
    await page.locator(stringFormat(PowerAppsAlertWindow.AlertButton,'alertdialog','okButton')).waitFor({state:'attached'});
    await page.locator(stringFormat(PowerAppsAlertWindow.AlertButton,'alertdialog','okButton')).waitFor({state:'visible'});
    await expect(page.locator(stringFormat(PowerAppsAlertWindow.AlertButton,'alertdialog','okButton'))).toHaveText("Ok", { timeout: 10000 });
    await page.locator(stringFormat(PowerAppsAlertWindow.AlertButton,'alertdialog','okButton')).click();
    await frame.locator(stringFormat(PowerAppsCommonComponents.StaticButton,'Create New Profile')).scrollIntoViewIfNeeded();
    await frame.locator(stringFormat(PowerAppsCommonComponents.StaticButton,'Create New Profile')).waitFor({state:'visible'});
    await frame.locator(stringFormat(PowerAppsCommonComponents.StaticButton,'Create New Profile')).click();
    await page.locator(stringFormat(PowerAppsListSelector.MenuTabList,'eForm Form','Company Entitlements')).waitFor({state:'visible'}); 
    await page.locator(stringFormat(FormControlSelectors.OptionSet,'ewb_businesspackages')).click();
    await page.locator(stringFormat(PowerAppsListSelector.DivSelectBox,'listbox','option','Standard')).click();
    //Account Entitlement
    addAccount(page);
   /* await page.locator(stringFormat(PowerAppsListSelector.MenuTabList,'eForm Form','Account Entitlements')).click();
    await page.locator(stringFormat(PowerAppsCommonComponents.DynamicButton,'menuitem','Add Accounts')).click();
    //await page.locator(stringFormat(subAreaMenuSelectors.DynamicSubMenuSelector,'menu','Add Accounts')).click();
    await page.waitForSelector(stringFormat(PowerAppsCommonComponents.SpinnerSelector),{state:'hidden'});
    const accountFrame=page.frameLocator(stringFormat(PowerAppsUSSearchDashboard.frmDashboard,'MscrmControls.WebResource.WebResourceHtmlControl-FullPageWebResource'));
    await accountFrame.locator(stringFormat(gridSelectors.GridRowsColumnInputSector,'1','10')).waitFor({state:'visible'});
    await accountFrame.locator(stringFormat(gridSelectors.GridRowsColumnInputSector,'4','10')).click(); 
    await page.locator(stringFormat(PowerAppsAlertWindow.AlertButton,'confirmdialog','confirmButton')).click();
    await page.locator(stringFormat(PowerAppsAlertWindow.AlertButton,'alertdialog','okButton')).click();
    await accountFrame.locator(stringFormat(gridSelectors.GridRowsColumnInputSector,'1','2')).click();
    await accountFrame.locator(stringFormat(gridSelectors.GridRowsColumnInputSector,'3','2')).click(); 
    await accountFrame.locator(stringFormat(PowerAppsCommonComponents.StaticButton,'Add Account Entitlements')).scrollIntoViewIfNeeded();
    await accountFrame.locator(stringFormat(PowerAppsCommonComponents.StaticButton,'Add Account Entitlements')).waitFor({state:'attached'});
    await accountFrame.locator(stringFormat(PowerAppsCommonComponents.StaticButton,'Add Account Entitlements')).waitFor({state:'visible'});
    await accountFrame.locator(stringFormat(PowerAppsCommonComponents.StaticButton,'Add Account Entitlements')).click();
    await page.waitForSelector(stringFormat(PowerAppsCommonComponents.SpinnerSelector),{state:'hidden'});
    await page.locator(stringFormat(PowerAppsAlertWindow.AlertButton,'alertdialog','okButton')).click();
    await accountFrame.locator(stringFormat(PowerAppsCommonComponents.StaticButton,'Close')).click();
    await page.waitForSelector(stringFormat(PowerAppsCommonComponents.SpinnerSelector),{state:'hidden'});
    if(await page.locator(stringFormat(PowerAppsListSelector.MenuTabList,'eForm Form','Online Administrator')).isHidden()){
      console.log("Online admin is Hidded")
      await page.locator(stringFormat(PowerAppsListSelector.MenuTabList,'eForm Form','More Tabs')).click();
      await page.locator(stringFormat(PowerAppsListSelector.DivMenuBox,'menu','menuitem','Online Administrator')).click();
    }
    else{
      await page.locator(stringFormat(PowerAppsListSelector.MenuTabList,'eForm Form','Online Administrator')).click();
    }
      */
      //Adding user details
    await page.locator(stringFormat(PowerAppsCommonComponents.DynamicButton,'menuitem','New User. Add New User')).click();
    await page.waitForSelector(stringFormat(PowerAppsCommonComponents.SpinnerSelector),{state:'hidden'});
    await page.locator(stringFormat(FormControlSelectors.TextBox,'ewb_firstname')).fill(testData.User1_FirstName);
    await page.locator(stringFormat(FormControlSelectors.TextBox,'ewb_lastname')).fill(testData.User1_LastName);
    await page.locator(stringFormat(FormControlSelectors.MailTextBox,'ewb_administratoremailaddress')).fill(testData.User1_Email);
    await page.locator(stringFormat(FormControlSelectors.ToggleContainer,'ewb_signer')).click();
    await page.locator(stringFormat(FormControlSelectors.PhoneTextBox,'ewb_administratorphone')).fill(testData.User1_PhoneNumer_1);
    await page.locator(stringFormat(subAreaMenuSelectors.DynamicSubAreaMenuSelector,'Commands','Save & Close')).click();
    await page.waitForSelector(stringFormat(PowerAppsCommonComponents.SpinnerSelector),{state:'hidden'});
    await page.locator(stringFormat(PowerAppsCommonComponents.DynamicButton,'menuitem','New User. Add New User')).click();
    await page.locator(stringFormat(FormControlSelectors.TextBox,'ewb_firstname')).fill('Second User');
    await page.locator(stringFormat(FormControlSelectors.TextBox,'ewb_lastname')).fill('4Last Name');
    await page.locator(stringFormat(FormControlSelectors.MailTextBox,'ewb_administratoremailaddress')).fill('email2@gmail.com');
    await page.locator(stringFormat(FormControlSelectors.ToggleContainer,'ewb_signer')).click();
    await page.locator(stringFormat(FormControlSelectors.PhoneTextBox,'ewb_administratorphone')).fill('123456');
    await page.locator(stringFormat(subAreaMenuSelectors.DynamicSubAreaMenuSelector,'Commands','Save & Close')).click();
    //Generate PDF
    //const screenshot =await this.page.screenshot({ path: 'screenshot.png', fullPage: true });
    //testinfo.attach(testinfo.title,{ body: screenshot, contentType: 'image/png'} );
    
    await allure.description(
      "GTSA 2.0 New New eForm creation \n\n Note that maker creates the new eForm for the customer",
    );
    
    await allure.owner("Muthu");
    await allure.tags("NeweForm", "BBP");
    await allure.severity(Severity.CRITICAL);
    await allure.link("https://example.com/docs", "Related Documentation");
    await allure.issue("AUTH-123", "https://example.com/issues/AUTH-123");
  });
});
