import { test, expect, type Page } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
import { PowerAppsUSSearchDashboard,PowerAppsAlertWindow,PowerAppsCommonComponents,PowerAppsListSelector,subAreaMenuSelectors, viewSelectors, 
  gridSelectors} from "../PowerAppsSelectors.json";
import { stringFormat, } from '../../utils/common';

export async function addAccount(page:Page){
    await page.locator(stringFormat(PowerAppsListSelector.MenuTabList,'eForm Form','Account Entitlements')).click();
    await page.locator(stringFormat(PowerAppsCommonComponents.DynamicButton,'menuitem','Add Accounts')).click();
    await page.locator(stringFormat(subAreaMenuSelectors.DynamicSubMenuSelector,'menu','Add Accounts')).click();
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
      await page.locator(stringFormat(PowerAppsListSelector.MenuTabList,'eForm Form','More Tabs')).click();
      await page.locator(stringFormat(PowerAppsListSelector.DivMenuBox,'menu','menuitem','Online Administrator')).click();
    }
    else{
      await page.locator(stringFormat(PowerAppsListSelector.MenuTabList,'eForm Form','Online Administrator')).click();
    }
}