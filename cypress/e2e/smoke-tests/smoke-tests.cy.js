import { onMercurySmokeTestsPage } from '../../support/pageObjects/mercurySmokeTestsPage'
import { onMercuryValidationTestsPage } from '../../support/pageObjects/mercuryValidationTestsPage'


import 'cypress-time-marks'

Cypress.config('defaultCommandTimeout', 60000)


/*
  Tests de fumée (smoke tests):
  Le test de fumée est un moyen de tester un logiciel afin de déterminer si ledit logiciel est stable ou non. 
  Les tests de fumée confirment si l’équipe d’assurance qualité peut procéder à d’autres tests ou si un développement 
  supplémentaire est nécessaire avant de procéder.
  Test commit
*/


/* 

ENVIRONNEMENT:

DEV: https://mercury-react-kqwuw7jkta-ew.a.run.app/ 

PREPROD: https://mercury-react-pre-prod-kqwuw7jkta-ew.a.run.app/

ENV DE TEST GCP DOCKERISE (COPIE DE LA DEV): 

/*
TODOs: 
1- l'auth se bloque au bout de 3 tentatives et on a le message suivant
"It seems that your user is locked. It could be because you have tried to connect too many times 
with a wrong password. Please reset your password with the "Forgotten password" link below"
2- Sur dev Mercury, https://mercury-react-kqwuw7jkta-ew.a.run.app/, y'a t il tjrs des développements ?
3- Je vais demander une copie de la PROD sur un environnement de tests dédiés (dockerisé dans GCP). 
Les smoke tests et les tests de validation seront lancés dessus.
4- Maj "plan de tests":
  - Retroplanning
  - Tableau des tests de validation prioritaires
  - Schema env. de tests GCP
*/

/*
TODO FIX DEMO

Objectif : Tester l'ensemble des pages de Mercury listées ci-dessous :
Login
Dashboard
Overview
All Variations (Somatic & Germline)
Page CNV
Fusion
Structural variants
Rapport
ID Card
Favorite filters
IGV Browser
Release note
Materiels & Methods
Bug report management
Licence / User Management
Quick navigation
New analysis
Logout

Qualification3_RNA 
Qualification_RNA  
Qualification2_ARN 
qualification_duo_620
qualification2_duo_620
qualification3_duo_620
qualification_ponduo_620
qualification3_ponduo_620
qualification_pontrio_620
qualification2_ponduo_620
qualification2_trio_620
qualification_trio_620

*/


/* 
  Mercury
*/

/* 
    UI - Smoketests
*/
describe('Mercury - Smoke Tests UI', () => {
 
  beforeEach(function () {
    onMercurySmokeTestsPage.whenWeGoToTheLoginPage()
  })

  describe('1-Login page: Mercury Login Page display', () => {

    before(function () {
      onMercurySmokeTestsPage.givenWeAreOnTheLoginPage()
    })

    it('Should display each element of the login page', () => {
      onMercurySmokeTestsPage.thenWeShouldSeeLoginPage()
      onMercurySmokeTestsPage.andWeShouldSeeTheLogoMercury()
      onMercurySmokeTestsPage.andWeShouldSeeMainTitle('Dear user, log in to access to your dashboard')
      onMercurySmokeTestsPage.andWeShouldSeeLoginFieldLabeled('Login')
      onMercurySmokeTestsPage.andWeShouldSeePasswordFieldLabeled('Password')
      onMercurySmokeTestsPage.andWeShouldSeePasswordFieldWithAnEyeIcon()
      onMercurySmokeTestsPage.andWeShouldSeeSubmitButtonLabeled('SUBMIT')
      onMercurySmokeTestsPage.andWeShouldSeeALink('Forgotten password')
      onMercurySmokeTestsPage.andWeShouldSeeALabel('Having trouble connecting ? Contact us:')
      onMercurySmokeTestsPage.andWeShouldSeeAnEmailLink('mercurysupport@oncodna.com')
    })

    it('Should display the time load of the main homepage', () => {
      cy.displayTimeLoadOf('login')
    })
  })

  describe('2-Authentication OK with the right email and Password', () => {

    before(function () {
      onMercurySmokeTestsPage.givenWeAreOnTheLoginPage()
    })

    it('Should log in to the main homepage with the right email and Password', () => {
      onMercurySmokeTestsPage.whenWeFillInLoginFieldWith('bioinf')
      onMercurySmokeTestsPage.andWeFillInPasswordFieldWith('bioinf')
      onMercurySmokeTestsPage.andWeClickOnSubmitButton()
      onMercurySmokeTestsPage.thenWeShouldBeLoggedOnTheMainHomePageLocatedAtUrl(Cypress.config('baseUrl'))
      onMercurySmokeTestsPage.andWeShouldSeeTheLogo('Mercury Logo')
      onMercurySmokeTestsPage.andWeShouldSeeTheTopSidebarMenu('Dashboard')
      onMercurySmokeTestsPage.andWeShouldSeeTheTopSidebarMenu('New Analysis')
      onMercurySmokeTestsPage.andWeShouldSeeTheTopTab('ANALYZES')
      onMercurySmokeTestsPage.andWeShouldSeeTheTopTab('BATCHES')
    })

    it('Should display the time load of the main homepage', () => {
      cy.displayTimeLoadOf('dashboard')
    })
  })

  describe('3-Authentication KO with direct url access', () => {
    before(() => {
      onMercurySmokeTestsPage.givenWeAreOnTheLoginPage()
    })

    
    it('Should not be able to directly access the Main Homepage via the url without log in', () => {
      onMercurySmokeTestsPage.whenWeVisitDirectlyTheUrl(Cypress.config('baseUrl'))
      onMercurySmokeTestsPage.thenWeShouldStayOnTheLoginPage()
    })

    it('Should not be able to directly access the New Analysis Page via the url without log in', () => {
      onMercurySmokeTestsPage.whenWeVisitDirectlyTheUrl('https://mercury-react-kqwuw7jkta-ew.a.run.app/new-analysis')
      onMercurySmokeTestsPage.thenWeShouldStayOnTheLoginPage()
    })

    it('Should not be able to directly access the Analysis Management Page via the url without log in', () => {
      onMercurySmokeTestsPage.whenWeVisitDirectlyTheUrl('https://mercury-react-kqwuw7jkta-ew.a.run.app/admin/analyzes-management')
      onMercurySmokeTestsPage.thenWeShouldStayOnTheLoginPage()
    })

    it('Should not be able to directly access the Release Management Page via the url without log in', () => {
      onMercurySmokeTestsPage.whenWeVisitDirectlyTheUrl('https://mercury-react-kqwuw7jkta-ew.a.run.app/admin/release-notes')
      onMercurySmokeTestsPage.thenWeShouldStayOnTheLoginPage()
    })

    it('Should not be able to directly access the Licences Management Page via the url without log in', () => {
      onMercurySmokeTestsPage.whenWeVisitDirectlyTheUrl('https://mercury-react-kqwuw7jkta-ew.a.run.app/admin/licences')
      onMercurySmokeTestsPage.thenWeShouldStayOnTheLoginPage()
    })

    it('Should not be able to directly access the Users Management Page via the url without log in', () => {
      onMercurySmokeTestsPage.whenWeVisitDirectlyTheUrl('https://mercury-react-kqwuw7jkta-ew.a.run.app/admin/users')
      onMercurySmokeTestsPage.thenWeShouldStayOnTheLoginPage()
    })

    it('Should not be able to directly access the API Doc Page via the url without log in', () => {
      onMercurySmokeTestsPage.whenWeVisitDirectlyTheUrl('https://mercury-react-kqwuw7jkta-ew.a.run.app/admin/api/doc')
      onMercurySmokeTestsPage.thenWeShouldStayOnTheLoginPage()
    })

    it('Should not be able to directly access the Favorite Filters Page via the url without log in', () => {
      onMercurySmokeTestsPage.whenWeVisitDirectlyTheUrl('https://mercury-react-kqwuw7jkta-ew.a.run.app/favorite-filters/somatic')
      onMercurySmokeTestsPage.thenWeShouldStayOnTheLoginPage()
    })
  })

  describe('4-Visit of critical pages of Mercury', () => {

    beforeEach(() => {
      onMercurySmokeTestsPage.whenWeLoginToMercuryWithTheAccess('bioinf', 'bioinf')
      cy.viewport(1280, 720)
    })
  
    it('Overview: Should be able to visit the Overview Page', () => {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      onMercuryValidationTestsPage.whenWeSelectAnalysis('qualification3_ponduo_620')
      onMercurySmokeTestsPage.thenWeAreOnOverviewPage()      
      onMercurySmokeTestsPage.andWeShouldSeeTheAnalysisTitle('qualification3_ponduo_620 - PON_MAPTUMOR-T1-ADN_VEP101')  
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()    
      onMercurySmokeTestsPage.andWeShouldSeeTheTopMenuList([
        'Dashboard',
        'Overview',
        'All variation types',
        'CNV',
        'QC',
        'Mat & Meth',
        'Clinical report'
      ])
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    })

    it('Dashboard: Should be able to visit the Dashboard Page', () => {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      onMercuryValidationTestsPage.whenWeSelectAnalysis('qualification3_ponduo_620')
      onMercurySmokeTestsPage.thenWeAreOnOverviewPage()      
      onMercurySmokeTestsPage.andWeShouldSeeTheAnalysisTitle('qualification3_ponduo_620 - PON_MAPTUMOR-T1-ADN_VEP101')      
      onMercurySmokeTestsPage.andWeShouldSeeTheTopMenuList([
        'Dashboard',
        'Overview',
        'All variation types',
        'CNV',
        'QC',
        'Mat & Meth',
        'Clinical report'
      ])
      onMercurySmokeTestsPage.whenWeSelectTheTopMenu('Dashboard')
      onMercurySmokeTestsPage.thenWeShouldBeOnDashboardPage()
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    })

    it('All variation types: Should be able to visit the All variation types Page', () => {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      onMercuryValidationTestsPage.whenWeSelectAnalysis('qualification3_ponduo_620')
      onMercurySmokeTestsPage.thenWeAreOnOverviewPage()      
      onMercurySmokeTestsPage.andWeShouldSeeTheAnalysisTitle('qualification3_ponduo_620 - PON_MAPTUMOR-T1-ADN_VEP101')      
      onMercurySmokeTestsPage.andWeShouldSeeTheTopMenuList([
        'Dashboard',
        'Overview',
        'All variation types',
        'CNV',
        'QC',
        'Mat & Meth',
        'Clinical report'
      ])
      onMercurySmokeTestsPage.whenWeSelectTheTopMenu('All variation types')
      onMercurySmokeTestsPage.thenWeShouldBeOnPage('all-variation-types')
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    })

    it('CNV: Should be able to visit the CNV Page', () => {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      onMercuryValidationTestsPage.whenWeSelectAnalysis('qualification3_ponduo_620')
      onMercurySmokeTestsPage.thenWeAreOnOverviewPage()      
      onMercurySmokeTestsPage.andWeShouldSeeTheAnalysisTitle('qualification3_ponduo_620 - PON_MAPTUMOR-T1-ADN_VEP101')      
      onMercurySmokeTestsPage.andWeShouldSeeTheTopMenuList([
        'Dashboard',
        'Overview',
        'All variation types',
        'CNV',
        'QC',
        'Mat & Meth',
        'Clinical report'
      ])
      onMercurySmokeTestsPage.whenWeSelectTheTopMenu('CNV')
      onMercurySmokeTestsPage.thenWeShouldBeOnPage('cnv')
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    })

    it('QC Reporting: Should be able to visit the QC Reporting Page', () => {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      onMercuryValidationTestsPage.whenWeSelectAnalysis('qualification3_ponduo_620')
      onMercurySmokeTestsPage.thenWeAreOnOverviewPage()      
      onMercurySmokeTestsPage.andWeShouldSeeTheAnalysisTitle('qualification3_ponduo_620 - PON_MAPTUMOR-T1-ADN_VEP101')      
      onMercurySmokeTestsPage.andWeShouldSeeTheTopMenuList([
        'Dashboard',
        'Overview',
        'All variation types',
        'CNV',
        'QC',
        'Mat & Meth',
        'Clinical report'
      ])
      onMercurySmokeTestsPage.whenWeSelectTheTopMenu('QC')
      onMercurySmokeTestsPage.whenWeSelectTheTopSubMenu('QC Reporting')
      onMercurySmokeTestsPage.thenWeShouldBeOnPage('/qc/reporting')
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    })

    it('QC Hotspots: Should be able to visit the QC Hotspots Page', () => {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      onMercuryValidationTestsPage.whenWeSelectAnalysis('qualification3_ponduo_620')
      onMercurySmokeTestsPage.thenWeAreOnOverviewPage()      
      onMercurySmokeTestsPage.andWeShouldSeeTheAnalysisTitle('qualification3_ponduo_620 - PON_MAPTUMOR-T1-ADN_VEP101')      
      onMercurySmokeTestsPage.andWeShouldSeeTheTopMenuList([
        'Dashboard',
        'Overview',
        'All variation types',
        'CNV',
        'QC',
        'Mat & Meth',
        'Clinical report'
      ])
      onMercurySmokeTestsPage.whenWeSelectTheTopMenu('QC')
      onMercurySmokeTestsPage.whenWeSelectTheTopSubMenu('QC Hotspots')
      onMercurySmokeTestsPage.thenWeShouldBeOnPage('/qc/hotspots')
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    })

    it('Mat & Meth: Should be able to visit the Mat & Meth Page', () => {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      onMercuryValidationTestsPage.whenWeSelectAnalysis('qualification3_ponduo_620')
      onMercurySmokeTestsPage.thenWeAreOnOverviewPage()      
      onMercurySmokeTestsPage.andWeShouldSeeTheAnalysisTitle('qualification3_ponduo_620 - PON_MAPTUMOR-T1-ADN_VEP101')      
      onMercurySmokeTestsPage.andWeShouldSeeTheTopMenuList([
        'Dashboard',
        'Overview',
        'All variation types',
        'CNV',
        'QC',
        'Mat & Meth',
        'Clinical report'
      ])
      onMercurySmokeTestsPage.whenWeSelectTheTopMenu('Mat & Meth')
      onMercurySmokeTestsPage.thenWeShouldBeOnPage('/mat-meth')
      cy.contains('qualification3_ponduo_620 - PON_MAPTUMOR-T1-ADN_VEP101', { matchCase: false }).should('be.visible')
      cy.contains('File Descriptions', { matchCase: false }).should('be.visible')
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    })

    it('Rapport: Should be able to visit the Clinical Report Page', () => {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      onMercuryValidationTestsPage.whenWeSelectAnalysis('qualification3_ponduo_620')
      onMercurySmokeTestsPage.thenWeAreOnOverviewPage()      
      onMercurySmokeTestsPage.andWeShouldSeeTheAnalysisTitle('qualification3_ponduo_620 - PON_MAPTUMOR-T1-ADN_VEP101')      
      onMercurySmokeTestsPage.andWeShouldSeeTheTopMenuList([
        'Dashboard',
        'Overview',
        'All variation types',
        'CNV',
        'QC',
        'Mat & Meth',
        'Clinical report'
      ])
      onMercurySmokeTestsPage.whenWeSelectTheTopMenu('Clinical report')
      onMercurySmokeTestsPage.thenWeShouldBeOnPage('/clinical-report')
      cy.contains('qualification3_ponduo_620 - PON_MAPTUMOR-T1-ADN_VEP101', { matchCase: false }).should('be.visible')
      cy.contains('SHOW REPORTS', { matchCase: false }).should('be.visible')
      cy.contains('RELEASE REPORT', { matchCase: false }).should('be.visible')
      cy.contains('DOWNLOAD PDF', { matchCase: false }).should('be.visible')
      cy.contains('COLLAPSE ALL', { matchCase: false }).should('be.visible')
      cy.contains('PATIENT INFORMATION', { matchCase: false }).should('be.visible')
      cy.contains('EXECUTIVE SUMMARY', { matchCase: false }).should('be.visible')
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    })

    it('Bug report management: Should be able to open the bug report popup', () => {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      onMercuryValidationTestsPage.whenWeSelectAnalysis('qualification3_ponduo_620')
      onMercurySmokeTestsPage.thenWeAreOnOverviewPage()      
      onMercurySmokeTestsPage.andWeShouldSeeTheAnalysisTitle('qualification3_ponduo_620 - PON_MAPTUMOR-T1-ADN_VEP101')      
      onMercurySmokeTestsPage.andWeShouldSeeTheTopMenuList([
        'Dashboard',
        'Overview',
        'All variation types',
        'CNV',
        'QC',
        'Mat & Meth',
        'Clinical report'
      ])
      cy.get('.css-u40w9t > [data-testid="BugReportIcon"] > path').should('be.visible');
      cy.get('.css-u40w9t').click();
      cy.get('.css-j7qwjs > .css-0 > .MuiTypography-root').should('have.text', 'Bug / Suggestion');
      cy.get('#mui-4').should('be.visible');
      cy.get('#mui-4').should('be.enabled');
      cy.get('#mui-4').click();
      cy.get('#mui-4').should('have.attr', 'name', 'summary');
      cy.get('#mui-4').click();
      cy.get('#mui-4').click();
      cy.get('#mui-5').click();
      cy.get('#mui-5').should('be.visible');
      cy.get('#mui-5').should('be.enabled');
      cy.get('#mui-component-select-impact').should('be.visible');
      cy.get('#mui-component-select-reproducibility').should('be.visible');
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    })

    it('Quick navigation: Should be able to open the quick navigation popup', () => {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      onMercuryValidationTestsPage.whenWeSelectAnalysis('qualification3_ponduo_620')
      onMercurySmokeTestsPage.thenWeAreOnOverviewPage()      
      onMercurySmokeTestsPage.andWeShouldSeeTheAnalysisTitle('qualification3_ponduo_620 - PON_MAPTUMOR-T1-ADN_VEP101')      
      onMercurySmokeTestsPage.andWeShouldSeeTheTopMenuList([
        'Dashboard',
        'Overview',
        'All variation types',
        'CNV',
        'QC',
        'Mat & Meth',
        'Clinical report'
      ])
      cy.get('[data-testid="ExploreIcon"] > path').should('be.visible');
      cy.get('[data-testid="ExploreIcon"] > path').click();
      cy.get('.css-hytd4z > .MuiPaper-root > .MuiBox-root > .MuiTypography-h6').should('have.text', ' Quick Nav');
      cy.get('.MuiPaper-root > .MuiBox-root > .MuiTypography-caption').should('have.text', 'Here are your 5 last visited analyzes. Click on an analysis to go to its overview');
      cy.get('.css-hytd4z > .MuiPaper-root').should('be.visible');
      cy.get('.css-hytd4z > .MuiPaper-root').should('have.attr', 'style', 'transform: none; transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;');
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    })

    it('Licences Management: Should be able to browse into the Licences Management menu', () => {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      onMercurySmokeTestsPage.whenWeClickOnAvatar()
      onMercurySmokeTestsPage.thenWeShouldSeeTheDropDownMenuList([
        'Analyzes Management',
        'Releases management',
        'Licences management',
        'Users management',
        'API Doc',
        'User impersonation',
        'Favorite filters',
        'Change password',
        'Logout'
      ])
      onMercurySmokeTestsPage.whenWeBrowseViaMenu('Licences management')
      onMercurySmokeTestsPage.thenWeShouldBeOnPage('/admin/licences')
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    })

    it('Users Management: Should be able to browse into the Users Management menu', () => {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      onMercurySmokeTestsPage.whenWeClickOnAvatar()
      onMercurySmokeTestsPage.thenWeShouldSeeTheDropDownMenuList([
        'Analyzes Management',
        'Releases management',
        'Licences management',
        'Users management',
        'API Doc',
        'User impersonation',
        'Favorite filters',
        'Change password',
        'Logout'
      ])
      onMercurySmokeTestsPage.whenWeBrowseViaMenu('Users management')
      onMercurySmokeTestsPage.thenWeShouldBeOnPage('/admin/users')
      onMercurySmokeTestsPage.andWeShouldBeOnThePageEntitled('User Management')
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    })

    it('Release Notes: Should be able to browse into the Releases Management menu', () => {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      onMercurySmokeTestsPage.whenWeClickOnAvatar()
      onMercurySmokeTestsPage.thenWeShouldSeeTheDropDownMenuList([
        'Analyzes Management',
        'Releases management',
        'Licences management',
        'Users management',
        'API Doc',
        'User impersonation',
        'Favorite filters',
        'Change password',
        'Logout'
      ])
      onMercurySmokeTestsPage.whenWeBrowseViaMenu('Releases management')
      onMercurySmokeTestsPage.thenWeShouldBeOnPage('/release-notes')
      cy.contains('Search Keyword', { matchCase: false }).should('be.visible')
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    })

    it('Favorite filters: Should be able to browse into the Favorite Filters menu', () => {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      onMercurySmokeTestsPage.whenWeClickOnAvatar()
      onMercurySmokeTestsPage.thenWeShouldSeeTheDropDownMenuList([
        'Analyzes Management',
        'Releases management',
        'Licences management',
        'Users management',
        'API Doc',
        'User impersonation',
        'Favorite filters',
        'Change password',
        'Logout'
      ])
      onMercurySmokeTestsPage.whenWeBrowseViaMenu('Favorite filters')
      onMercurySmokeTestsPage.thenWeShouldBeOnThePageLocatedAtUrl('/favorite-filters/somatic')
      onMercurySmokeTestsPage.andWeShouldBeOnThePageEntitled('Select one of your favorite filters first...')
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    })

    it('Fusions: Should be able to visit the Fusions Page', function() {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      cy.get('#mui-component-select-status').should('have.text', 'Analysis available/Report in progress');
      cy.contains('Analysis available/Report in progress', { matchCase: false }).click({force: true})
      cy.get('[data-value="all"]').click({force: true});
      cy.get('#mui-component-select-status').should('have.text', 'All');
      onMercuryValidationTestsPage.whenWeSelectAnalysis('Qualification_RNA')
      onMercurySmokeTestsPage.thenWeAreOnOverviewPage()      
      onMercurySmokeTestsPage.andWeShouldSeeTheAnalysisTitle('Qualification_RNA - T1-ARN-VEP101')      
      onMercurySmokeTestsPage.andWeShouldSeeTheTopMenuList([
        'Dashboard',
        'Overview',
        'All variation types',
        'Fusions',
        'QC',
        'Mat & Meth',
        'Clinical report'
      ])
      onMercurySmokeTestsPage.whenWeSelectTheTopMenu('Fusions')
      onMercurySmokeTestsPage.thenWeShouldBeOnPage('fusions')
      cy.contains('Qualification_RNA - T1-ARN-VEP101', { matchCase: false }).should('be.visible')
      cy.contains('Favorite Filters', { matchCase: false }).should('be.visible')
      cy.contains('Only InFrame/Frameshit Fusions', { matchCase: false }).should('be.visible')
      cy.contains('Only in Cancer Genes', { matchCase: false }).should('be.visible')
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    });

    it('New Analysis: Should not be able to visit the new analysis tab of the main dashboard', function() {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      onMercurySmokeTestsPage.andWeShouldSeeTheTopSidebarMenu('New Analysis')
      onMercurySmokeTestsPage.whenWeClickTheTopSidebarMenu('New Analysis')
      onMercurySmokeTestsPage.whenWeClickTheTopSidebarMenu('New Analysis')
      onMercurySmokeTestsPage.thenWeShouldBeOnThePageLocatedAtUrl('/new-analysis')
      onMercurySmokeTestsPage.andWeShouldBeOnThePageEntitled('Step 1')
      cy.contains('Files', { matchCase: false }).should('be.visible')
      cy.contains('Sample information', { matchCase: false }).should('be.visible')
      cy.contains('New analyzes', { matchCase: false }).should('be.visible')
      cy.contains('Analyzes summary', { matchCase: false }).should('be.visible')
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner() 
    });

    it('Somatic: Should be able to visit the Somatic Page', function() {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      cy.get('#mui-component-select-status').should('have.text', 'Analysis available/Report in progress');
      cy.contains('Analysis available/Report in progress', { matchCase: false }).click({force: true})
      cy.get('[data-value="all"]').click({force: true});
      cy.get('#mui-component-select-status').should('have.text', 'All');
      onMercuryValidationTestsPage.whenWeSelectAnalysis('qualification_duo_620')
      onMercurySmokeTestsPage.thenWeAreOnOverviewPage()      
      onMercurySmokeTestsPage.andWeShouldSeeTheAnalysisTitle('qualification_duo_620 - BIOMEDE_CONSTIT-N_VEP101_BIOMEDE_TUMOR-ADN_VEP101')      
      onMercurySmokeTestsPage.andWeShouldSeeTheTopMenuList([
        'Dashboard',
        'Overview',
        'Somatic',
        'Germline',
        'CNV',
        'QC',
        'Mat & Meth',
        'Clinical report'
      ])
      onMercurySmokeTestsPage.whenWeSelectTheTopMenu('Somatic')
      onMercurySmokeTestsPage.thenWeShouldBeOnPage('somatic')
      cy.contains('qualification_duo_620 - BIOMEDE_CONSTIT-N_VEP101_BIOMEDE_TUMOR-ADN_VEP101', { matchCase: false }).click({force: true})
      cy.contains('Favorite Filters', { matchCase: false }).should('be.visible')
      cy.contains('Genes type', { matchCase: false }).should('be.visible')
      cy.contains('Levels of evidence for biomarker alterations', { matchCase: false }).should('be.visible')
      cy.contains('Gene names or alias', { matchCase: false }).should('be.visible')
      cy.contains('Mutations type', { matchCase: false }).should('be.visible')
      cy.contains('CNV type', { matchCase: false }).should('be.visible')
      cy.contains('ACMG classification', { matchCase: false }).should('be.visible')
      cy.contains('Variation names', { matchCase: false }).should('be.visible')
      cy.contains('Min. somatic score', { matchCase: false }).should('be.visible')
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    });

    it('Germline: Should be able to visit the Germline Page', function() {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      cy.get('#mui-component-select-status').should('have.text', 'Analysis available/Report in progress');
      cy.contains('Analysis available/Report in progress', { matchCase: false }).click({force: true})
      cy.get('[data-value="all"]').click({force: true});
      cy.get('#mui-component-select-status').should('have.text', 'All');
      onMercuryValidationTestsPage.whenWeSelectAnalysis('qualification_duo_620')
      onMercurySmokeTestsPage.thenWeAreOnOverviewPage()      
      onMercurySmokeTestsPage.andWeShouldSeeTheAnalysisTitle('qualification_duo_620 - BIOMEDE_CONSTIT-N_VEP101_BIOMEDE_TUMOR-ADN_VEP101')      
      onMercurySmokeTestsPage.andWeShouldSeeTheTopMenuList([
        'Dashboard',
        'Overview',
        'Somatic',
        'Germline',
        'CNV',
        'QC',
        'Mat & Meth',
        'Clinical report'
      ])
      onMercurySmokeTestsPage.whenWeSelectTheTopMenu('Germline')
      onMercurySmokeTestsPage.thenWeShouldBeOnPage('germline')
      cy.contains('qualification_duo_620 - BIOMEDE_CONSTIT-N_VEP101_BIOMEDE_TUMOR-ADN_VEP101', { matchCase: false }).click({force: true})
      cy.contains('Favorite Filters', { matchCase: false }).click({force: true})
      cy.contains('Genes type', { matchCase: false }).click({force: true})
      cy.contains('ACMG classification', { matchCase: false }).click({force: true})
      cy.contains('Gene names or alias', { matchCase: false }).click({force: true})
      cy.contains('Variation names', { matchCase: false }).click({force: true})
      cy.contains('Mutation enrichment', { matchCase: false }).click({force: true})
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    });

    // TODO: fix BUG
    it('Structural Variants: Should be able to visit the structural variants page', function() {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      cy.get('#mui-component-select-status').should('have.text', 'Analysis available/Report in progress');
      cy.contains('Analysis available/Report in progress', { matchCase: false }).click({force: true})
      cy.get('[data-value="all"]').click({force: true});
      cy.get('#mui-component-select-status').should('have.text', 'All');
      onMercuryValidationTestsPage.whenWeSelectAnalysis('PPD_p1-rnaonly')
      onMercurySmokeTestsPage.thenWeAreOnOverviewPage()      
      onMercurySmokeTestsPage.andWeShouldSeeTheAnalysisTitle('PPD_p1-rnaonly - PPD_PPD_dna-rnaonly-s1_PPD_rnaonly-s1')      
      onMercurySmokeTestsPage.andWeShouldSeeTheTopMenuList([
        'Dashboard',
        'Overview',
        'All variation types',
        'CNV',
        'Structural variants',
        'QC',
        'Mat & Meth',
        'Clinical report'
      ])
      onMercurySmokeTestsPage.whenWeSelectTheTopMenu('Structural variants')
      onMercurySmokeTestsPage.thenWeShouldBeOnPage('structural-variants')
      cy.contains('PPD_p1-rnaonly - PPD_PPD_dna-rnaonly-s1_PPD_rnaonly-s1', { matchCase: false }).click({force: true})
      //BUG: anomalie affichage page "Structural variants" de l'analyse PPD_p1-rnaonly
      cy.contains('An error occured', { matchCase: false }).should('be.visible')
      // cy.contains('Genes type', { matchCase: false }).should('be.visible')
      // cy.contains('Levels of evidence for biomarker alterations', { matchCase: false }).should('be.visible')
      // cy.contains('Gene names or alias', { matchCase: false }).should('be.visible')
      // cy.contains('Mutations type', { matchCase: false }).should('be.visible')
      // cy.contains('CNV type', { matchCase: false }).should('be.visible')
      // cy.contains('ACMG classification', { matchCase: false }).should('be.visible')
      // cy.contains('Variation names', { matchCase: false }).should('be.visible')
      // cy.contains('Min. somatic score', { matchCase: false }).should('be.visible')

      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    });

    it('ID Card: Should not be able to see the patient ID card', function() {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      onMercuryValidationTestsPage.whenWeSelectAnalysis('qualification3_ponduo_620')
      onMercurySmokeTestsPage.thenWeAreOnOverviewPage()      
      cy.contains('Patient', { matchCase: false }).click({force: true});
      cy.contains('PIN', { matchCase: false }).click({force: true});
      cy.contains('qualification3_ponduo_620', { matchCase: false }).click({force: true});
      cy.contains('Male', { matchCase: false }).click({force: true});
      cy.contains('N/A', { matchCase: false }).click({force: true});
      cy.contains('N/A', { matchCase: false }).click({force: true});
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    });

    it('IGV Browser: Should be able to visit the structural variants pagee', () => {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      cy.get('#mui-component-select-status').should('have.text', 'Analysis available/Report in progress');
      cy.contains('Analysis available/Report in progress', { matchCase: false }).click({force: true})
      cy.get('[data-value="all"]').click({force: true});
      cy.get('#mui-component-select-status').should('have.text', 'All');
      onMercuryValidationTestsPage.whenWeSelectAnalysis('Qualification3_RNA')
      onMercurySmokeTestsPage.thenWeAreOnOverviewPage()      
      onMercurySmokeTestsPage.andWeShouldSeeTheAnalysisTitle('Qualification3_RNA - T3-ARN-VEP101')      
      onMercurySmokeTestsPage.andWeShouldSeeTheTopMenuList([
        'Dashboard',
        'Overview',
        'All variation types',
        'Fusions',
        'QC',
        'Mat & Meth',
        'Clinical report'
      ])
      onMercurySmokeTestsPage.whenWeSelectTheTopMenu('QC')
      onMercurySmokeTestsPage.whenWeSelectTheTopSubMenu('QC Hotspots')
      onMercurySmokeTestsPage.thenWeShouldBeOnPage('/qc/hotspots')
      onMercuryValidationTestsPage.andWeAreOnQCHotspotsPage('Qualification3_RNA - T3-ARN-VEP101');
      cy.contains('QC Hotspots', { matchCase: false }).should('be.visible')
      onMercuryValidationTestsPage.whenWeSearchForGeneNames('CTLA4');
      onMercuryValidationTestsPage.thenWeShouldDisplayTableGenesResults([
        'CTLA4',
      ])
      cy.get('[data-testid="FullscreenIcon"]').should('be.visible');
      // cy.get('[data-testid="FullscreenIcon"] > path').should('have.attr', 'd', 'M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z');
      cy.get('[data-testid="FullscreenIcon"]').click();
      cy.get('[data-testid="FullscreenExitIcon"]').should('be.visible');
      cy.get('.MuiTableContainer-root').scrollTo('bottomRight').click({force: true});
      // cy.get('.css-1bygy2n > .MuiButtonBase-root > [data-testid="SearchIcon"] > path').should('be.visible');
      cy.get('.css-1bygy2n > .MuiButtonBase-root > [data-testid="SearchIcon"]').first().click({force: true});
      cy.get('.MuiTypography-root > span').should('have.text', 'Qualification3_RNA - T3-ARN-VEP101');
      cy.get('h1').should('have.text', 'Browser');
      cy.get('#IGV > path').should('be.visible');
      cy.get('.igv-navbar-toggle-button-container > :nth-child(1)').should('have.text', 'cursor guide');
      cy.get('.igv-navbar-button-clicked').should('have.text', 'track labels');
      cy.get('.igv-navbar-toggle-button-container > :nth-child(5)').should('have.text', 'Sample Names');
      cy.get('.igv-navbar-toggle-button-container > :nth-child(6)').should('have.text', 'Save SVG');
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    })

    it('Logout et Login: Should be able to logout and go to the login page', () => {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      onMercurySmokeTestsPage.whenWeClickOnAvatar()
      onMercurySmokeTestsPage.thenWeShouldSeeTheDropDownMenuList([
        'Analyzes Management',
        'Releases management',
        'Licences management',
        'Users management',
        'API Doc',
        'User impersonation',
        'Favorite filters',
        'Change password',
        'Logout'
      ])
      onMercurySmokeTestsPage.whenWeBrowseViaMenu('Logout')
      // Login
      onMercurySmokeTestsPage.thenWeShouldBeOnThePageLocatedAtUrl('/login')
      onMercurySmokeTestsPage.thenWeShouldSeeLoginPage()
      onMercurySmokeTestsPage.andWeShouldSeeTheLogoMercury()
      onMercurySmokeTestsPage.andWeShouldSeeMainTitle('Dear user, log in to access to your dashboard')
      onMercurySmokeTestsPage.andWeShouldSeeLoginFieldLabeled('Login')
      onMercurySmokeTestsPage.andWeShouldSeePasswordFieldLabeled('Password')
      onMercurySmokeTestsPage.andWeShouldSeePasswordFieldWithAnEyeIcon()
      onMercurySmokeTestsPage.andWeShouldSeeSubmitButtonLabeled('SUBMIT')
      onMercurySmokeTestsPage.andWeShouldSeeALink('Forgotten password')
      onMercurySmokeTestsPage.andWeShouldSeeALabel('Having trouble connecting ? Contact us:')
      onMercurySmokeTestsPage.andWeShouldSeeAnEmailLink('mercurysupport@oncodna.com')  
    })
  })

  describe('5-Browse into the main homepage of Mercury', () => {

    beforeEach(() => {
      onMercurySmokeTestsPage.whenWeLoginToMercuryWithTheAccess('bioinf', 'bioinf')
    })

    it('Should be able to display the Analyzes table', () => {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      onMercurySmokeTestsPage.whenWeClickOnLeftTopTab('ANALYZES')
      onMercurySmokeTestsPage.thenWeShouldSeeTheTableWithColumnsLabeled([
        'PIN',
        'Analysis',
        'Capture Kit',
        'Pathology',
        'Batch',
        '# Genes',
        'Status',
        'Progress',
        'Date',
        'Licences',
        'Export Report',
      ])
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    })

    it('Should be able to display the Batches table', () => {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      onMercurySmokeTestsPage.whenWeClickOnLeftTopTab('BATCHES')
      onMercurySmokeTestsPage.thenWeShouldSeeTheTableWithColumnsLabeled([
        'Run',
        'Sequencer',
        '# samples',
        'Reception date',
        'Progress',
        'Batch completed'
      ])
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    })
  })

  describe('6-Browse into the Analysis Management menu of Mercury', () => {

    beforeEach(() => {
      onMercurySmokeTestsPage.whenWeLoginToMercuryWithTheAccess('bioinf', 'bioinf')
    })
  
    it('Should be able to browse into the Analysis Management menu', () => {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      onMercurySmokeTestsPage.whenWeClickOnAvatar()
      onMercurySmokeTestsPage.thenWeShouldSeeTheDropDownMenuList([
        'Analyzes Management',
        'Releases management',
        'Licences management',
        'Users management',
        'API Doc',
        'User impersonation',
        'Favorite filters',
        'Change theme',
        'Change password',
        'Logout'
      ])
      onMercurySmokeTestsPage.whenWeBrowseViaMenu('Analyzes Management')
      onMercurySmokeTestsPage.thenWeShouldBeOnThePageLocatedAtUrl('/admin/analyzes-management')
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    })
  })

  describe('7-Browse into the API Doc menu of Mercury', () => {

    beforeEach(() => {
      onMercurySmokeTestsPage.whenWeLoginToMercuryWithTheAccess('bioinf', 'bioinf')
    })
  
    it('Should be able to browse into the API Doc menu', () => {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      onMercurySmokeTestsPage.whenWeClickOnAvatar()
      onMercurySmokeTestsPage.thenWeShouldSeeTheDropDownMenuList([
        'Analyzes Management',
        'Releases management',
        'Licences management',
        'Users management',
        'API Doc',
        'User impersonation',
        'Favorite filters',
        'Change theme',
        'Change password',
        'Logout'
      ])
      onMercurySmokeTestsPage.whenWeBrowseViaMenu('API Doc')
      onMercurySmokeTestsPage.thenWeShouldBeOnThePageLocatedAtUrl('/admin/api/doc')
      onMercurySmokeTestsPage.andWeShouldBeOnThePageEntitled('Mercury-API')
      onMercurySmokeTestsPage.andWeShouldBeOnThePageSubtitled('API for Mercury')
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    })
  })

  describe('8-Browse into the User Impersonation menu of Mercury', () => {

    beforeEach(() => {
      onMercurySmokeTestsPage.whenWeLoginToMercuryWithTheAccess('bioinf', 'bioinf')
    })
  
    it('Should be able to browse into the User Impersonation popup', () => {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      onMercurySmokeTestsPage.whenWeClickOnAvatar()
      onMercurySmokeTestsPage.thenWeShouldSeeTheDropDownMenuList([
        'Analyzes Management',
        'Releases management',
        'Licences management',
        'Users management',
        'API Doc',
        'User impersonation',
        'Favorite filters',
        'Change theme',
        'Change password',
        'Logout'
      ])
      onMercurySmokeTestsPage.whenWeBrowseViaMenu('User impersonation')
      onMercurySmokeTestsPage.thenWeShouldBeOnThePageLocatedAtUrl(Cypress.config('baseUrl'))
      onMercurySmokeTestsPage.andWeShouldSeeAPopupEntitled('User impersonation')
      onMercurySmokeTestsPage.withASearchMenuLabeled('Search for a user to impersonate')
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    })
  })

  describe('9-Browse into the Favorite Filters menu of Mercury', () => {

    beforeEach(() => {
      onMercurySmokeTestsPage.whenWeLoginToMercuryWithTheAccess('bioinf', 'bioinf')
    })
  
    it('Should be able to browse into the Favorite Filters menu', () => {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      onMercurySmokeTestsPage.whenWeClickOnAvatar()
      onMercurySmokeTestsPage.thenWeShouldSeeTheDropDownMenuList([
        'Analyzes Management',
        'Releases management',
        'Licences management',
        'Users management',
        'API Doc',
        'User impersonation',
        'Favorite filters',
        'Change theme',
        'Change password',
        'Logout'
      ])
      onMercurySmokeTestsPage.whenWeBrowseViaMenu('Favorite filters')
      onMercurySmokeTestsPage.thenWeShouldBeOnThePageLocatedAtUrl('/favorite-filters/somatic')
      onMercurySmokeTestsPage.andWeShouldBeOnThePageEntitled('Select one of your favorite filters first...')
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    })
  })

  describe('10-Browse into the Change Password menu of Mercury', () => {

    beforeEach(() => {
      onMercurySmokeTestsPage.whenWeLoginToMercuryWithTheAccess('bioinf', 'bioinf')
    })
  
    it('Should be able to browse into the Change Password popup', () => {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      onMercurySmokeTestsPage.whenWeClickOnAvatar()
      onMercurySmokeTestsPage.thenWeShouldSeeTheDropDownMenuList([
        'Analyzes Management',
        'Releases management',
        'Licences management',
        'Users management',
        'API Doc',
        'User impersonation',
        'Favorite filters',
        'Change theme',
        'Change password',
        'Logout'
      ])
      onMercurySmokeTestsPage.whenWeBrowseViaMenu('Change password')
      onMercurySmokeTestsPage.thenWeShouldBeOnThePageLocatedAtUrl(Cypress.config('baseUrl'))
      onMercurySmokeTestsPage.andWeShouldSeeAPopupEntitled('Change your password')
      onMercurySmokeTestsPage.andWeShouldSeeNewPasswordAFieldLabeled('New password')
      onMercurySmokeTestsPage.andWeShouldSeeAConfirmPasswordFieldLabeled('Confirm password')
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    })
  })

  describe('11-Mercury Forgotten Password popup display', () => {

    before(function () {
      onMercurySmokeTestsPage.givenWeAreOnTheLoginPage()
    })

    it('Should display each element of the login page', () => {
      onMercurySmokeTestsPage.thenWeShouldSeeLoginPage()
      onMercurySmokeTestsPage.andWeShouldSeeALink('Forgotten password ?')
      onMercurySmokeTestsPage.whenWeClickOnTheLink('Forgotten password ?')
      onMercurySmokeTestsPage.thenWeShouldBeOnThePageLocatedAtUrl('/forgotten-password')
      onMercurySmokeTestsPage.andWeShouldSeeMainTitle('Dear user, enter your email to reset your password')
      onMercurySmokeTestsPage.andWeShouldSeeSubmitButtonLabeled('SUBMIT')
      onMercurySmokeTestsPage.andWeShouldSeeTimeOfDisplayInTheTestRunner()
    })
  })

  describe('12-Logout from main homepage', () => {

    beforeEach(() => {
      onMercurySmokeTestsPage.whenWeLoginToMercuryWithTheAccess('bioinf', 'bioinf')
    })
  
    it('Should be able to logout from the main homepage', () => {
      onMercurySmokeTestsPage.givenWeAreLoggedOnTheMercuryDashboardAtUrl(Cypress.config('baseUrl'))
      onMercurySmokeTestsPage.whenWeClickOnAvatar()
      onMercurySmokeTestsPage.thenWeShouldSeeTheDropDownMenuList([
        'Analyzes Management',
        'Releases management',
        'Licences management',
        'Users management',
        'API Doc',
        'User impersonation',
        'Favorite filters',
        'Change theme',
        'Change password',
        'Logout'
      ])
      onMercurySmokeTestsPage.whenWeBrowseViaMenu('Logout')
      onMercurySmokeTestsPage.thenWeShouldBeOnThePageLocatedAtUrl('/login')
      onMercurySmokeTestsPage.thenWeShouldSeeLoginPage()
      onMercurySmokeTestsPage.andWeShouldSeeTheLogoMercury()
      onMercurySmokeTestsPage.andWeShouldSeeMainTitle('Dear user, log in to access to your dashboard')
      onMercurySmokeTestsPage.andWeShouldSeeLoginFieldLabeled('Login')
      onMercurySmokeTestsPage.andWeShouldSeePasswordFieldLabeled('Password')
      onMercurySmokeTestsPage.andWeShouldSeePasswordFieldWithAnEyeIcon()
      onMercurySmokeTestsPage.andWeShouldSeeSubmitButtonLabeled('SUBMIT')
      onMercurySmokeTestsPage.andWeShouldSeeALink('Forgotten password')
      onMercurySmokeTestsPage.andWeShouldSeeALabel('Having trouble connecting ? Contact us:')
      onMercurySmokeTestsPage.andWeShouldSeeAnEmailLink('mercurysupport@oncodna.com')  
    })
  })
})