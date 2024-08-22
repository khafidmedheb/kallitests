import { onMercurySmokeTestsPage } from '../../support/pageObjects/mercurySmokeTestsPage'
import { onMercuryValidationTestsPage } from '../../support/pageObjects/mercuryValidationTestsPage'

import 'cypress-time-marks'

Cypress.config('defaultCommandTimeout', 60000)



/*
  Tests Cases de Validation prioritaires (Zephyr Scale > Validations > Automatisation Cypress)
  TODO:
              MER-T161 -> script à définir (voir avec la QA)   
      MER-T177 
              MER-T251
*/


/* 
  Tests de Validation Mercury
*/
describe('Mercury (1.0): Tests de Validation', () => {
  before(function () {
    onMercurySmokeTestsPage.whenWeGoToTheLoginPage()
  })

  /*
    TODO
  */


  //TODO
  describe('MER-T177 (1.0): Dashboard : List of batches', () => {
    beforeEach(function () {
      onMercurySmokeTestsPage.givenWeAreOnTheLoginPage()
      /* ==== STEP 1 ==== */
      onMercurySmokeTestsPage.whenWeLoginToMercuryWithTheAccess('bioinf', 'bioinf')
      cy.viewport(1280, 720)
    })

    it('MER-T177-2: Should display a table in Batches tab dashboard page', function() {   
      /* ==== STEP 2 ==== */
      onMercuryValidationTestsPage.whenWeClickOnTab('BATCHES')
      onMercuryValidationTestsPage.whenWeShouldBeOnThePage('BATCHES')
      onMercuryValidationTestsPage.andWeShouldSeeTableWithColumns([
        'Run',
        'Sequencer',
        '# samples',
        'Reception date',
        'Progress',
        'Batch completed'
      ])
    });

    
    it('MER-T177-3: Should display the 2 filters on the Batches tab dashboard page', function() {   
      /* ==== STEP 3 ==== */
      onMercuryValidationTestsPage.whenWeClickOnTab('BATCHES')
      onMercuryValidationTestsPage.whenWeShouldBeOnThePage('BATCHES')
      onMercuryValidationTestsPage.thenWeShouldSeeBatchesFilter('Project / Analysis type')
      onMercuryValidationTestsPage.andWeShouldSeeBatchesFilter('Start date')
    });

    it('MER-T177-4: Should be able to modify the project/analysis type on the table of Batches tab dashboard page', function() {   
      /* ==== STEP 4 ==== */
      onMercuryValidationTestsPage.whenWeClickOnTab('BATCHES')
      onMercuryValidationTestsPage.whenWeShouldBeOnThePage('BATCHES')
      // Filter: Le type de projet/analyse
      onMercuryValidationTestsPage.whenWeSelectFilterType('HRD')
      onMercuryValidationTestsPage.thenWeShouldSeeTableBatchesResults([
        'PANEL_HRD'
      ])
      onMercuryValidationTestsPage.whenWeSelectFilterType('PANEL_CONSTIT')
      onMercuryValidationTestsPage.thenWeShouldSeeTableBatchesResults([
        'PANEL_GR'
      ])
      onMercuryValidationTestsPage.whenWeSelectFilterType('OncoXPLORE')
      onMercuryValidationTestsPage.thenWeShouldSeeTableBatchesResults([
        '220131_NS500197_0870_AHJLGLAFX3',
        'H3CW3DMXY',
        'H2MJGDMXY'
      ])
    });

    //TODO MERCREDI
    it.skip('MER-T177-5: Should be able to filter by date type on the table of Batches tab dashboard page', function() {   
      /* ==== STEP 5 ==== */
      onMercuryValidationTestsPage.whenWeClickOnTab('BATCHES')
      onMercuryValidationTestsPage.whenWeShouldBeOnThePage('BATCHES')
    });

    it('MER-T177-6: Should be able to modify the number of entries on the table of Batches tab dashboard page', function() {   
      /* ==== STEP 6 ==== */
      onMercuryValidationTestsPage.whenWeClickOnTab('BATCHES')
      onMercuryValidationTestsPage.whenWeShouldBeOnThePage('BATCHES')
      onMercuryValidationTestsPage.whenWeSelectFilterType('integragen')
      //10
      cy.contains('Rows per page')
        .parent()
        .find('div[role="button"]')
        .click()
      cy.get('li[data-value="10"]').should('be.visible').click();
      cy.get('tbody tr').should('have.length', 10)
      cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-10 of 226');
      //25
      cy.contains('Rows per page')
        .parent()
        .find('div[role="button"]')
        .click()
      cy.get('li[data-value="25"]').should('be.visible').click();
      cy.get('tbody tr').should('have.length', 25)
      cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-25 of 226');
      //50
      cy.contains('Rows per page')
        .parent()
        .find('div[role="button"]')
        .click()
      cy.get('li[data-value="50"]').should('be.visible').click();
      cy.get('tbody tr').should('have.length', 50)
      cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-50 of 226');
      //100
      cy.contains('Rows per page')
        .parent()
        .find('div[role="button"]')
        .click()
      cy.get('li[data-value="100"]').should('be.visible').click();
      cy.get('tbody tr').should('have.length', 100)
      cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-100 of 226');
    });

    it('MER-T177-7: Should be able to sort columns on the table of Batches tab dashboard page', function() {   
      /* ==== STEP 7 ==== */
      onMercuryValidationTestsPage.whenWeClickOnTab('BATCHES')
      onMercuryValidationTestsPage.whenWeShouldBeOnThePage('BATCHES')
      onMercuryValidationTestsPage.whenWeSelectFilterType('integragen')

      cy.get('.css-1j5itos > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').should('have.text', 'Reception date');
      cy.get('.css-1j5itos > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]').should('have.attr', 'data-testid', 'ArrowDownwardIcon').trigger('mouseover');
      cy.contains('Sorted by Reception date descending', { matchCase: false }).should('be.visible');
      onMercuryValidationTestsPage.thenWeShouldSeeTableBatchesResults([
        'noid5648854',
        'OKD24010-2',
        'OKD24010-2',
        '2024-04-04-oncoDEEP-DEMO-1',
        '2024-04-04-oncoDEEP-DEMO-1',
        'OKD24010-2',
        'OKD24010-2',
        'OKD24010-2'
      ])
      cy.get('.css-1j5itos > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]').click();
      cy.get('.css-1j5itos > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]').click();
      cy.contains('Sorted by Reception date ascending', { matchCase: false }).should('be.visible');
      onMercuryValidationTestsPage.thenWeShouldSeeTableBatchesResults([
        'HTJFYDMXX',
        'HTJWGDMXX',
        'HTJNGDMXX',
        'HTJMLDMXX',
        'PANEL_GR',
        'HTNYHDMXX',
        'PJ2011395',
        'DNA_Hemato_JG5GT',
        'PANEL_HRD'
      ])
    });

    it.skip('MER-T177-8: Should be able to display the QC table by clicking on a run', function() {   
      /* ==== STEP 8 ==== */
      onMercuryValidationTestsPage.whenWeClickOnTab('BATCHES')
      onMercuryValidationTestsPage.whenWeShouldBeOnThePage('BATCHES')
      onMercuryValidationTestsPage.whenWeSelectFilterType('integragen')
      cy.get('.css-1j5itos > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]').click();
      cy.get('.css-1j5itos > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]').click();
      cy.contains('Sorted by Reception date ascending', { matchCase: false }).should('be.visible');
      onMercuryValidationTestsPage.whenWeSelectRun('PJ2009333');
      onMercuryValidationTestsPage.thenWeAreOnQCPageOfQCName('PJ2009333');
      onMercuryValidationTestsPage.thenWeAreOnQCPageOfQCName('PJ2009333');
      onMercuryValidationTestsPage.andWeShouldSeeTableQCNameWithColumns([
        'Sample',
        'Analysis',
        'Yield (Gb)',
        'Align (%)',
        'On target (%)',
        'Read dup (%)',
        'Q30',
        'Mean Depth',
        'Coverage 100X (%)',
        'MM Read2 (%)',
        'Insert size',
        '# variants',
        '# CNV',
        'Flowcell',
        'Seq.',
        'Wetlab',
        'Export CSV',
      ])
      onMercuryValidationTestsPage.whenWeClickOnTab('RNA')
      onMercuryValidationTestsPage.thenWeShouldBeOnRNAPageOfQCName('PJ2009333')
      onMercuryValidationTestsPage.andWeShouldSeeTableQCNameWithColumns([
        'Sample',
        'Analysis',
        'Yield (Gb)',
        'Align (%)',
        'On target (%)',
        'Read dup (%)',
        'Q30',
        'Intragenic (%)',
        'Ribo (%)',
        'Insert size',
        '# variants',
        '# ',
        'Flowcell',
        'Seq.',
        'Wetlab',
        'Export CSV',
      ])
    });

    it.skip('MER-T177-9: Should be able to display the Global graph by clicking on Global graph tab', function() {   
      /* ==== STEP 9 ==== */
      onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV');
      onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('caco2_CNV - PON_1000-N_C2_1000-T');
      cy.contains('QC Hotspots', { matchCase: false }).click({ force: true });
      cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-50 of 257 (from 3193 total entries)');
      cy.get('[data-testid="KeyboardArrowRightIcon"]').click();
      cy.get('[data-testid="KeyboardArrowRightIcon"]').click();
      cy.get('[data-testid="KeyboardArrowRightIcon"]').click();
      cy.get('[data-testid="KeyboardArrowRightIcon"]').click();
      cy.get('[data-testid="KeyboardArrowRightIcon"]').click();
      cy.get('.MuiTablePagination-displayedRows').should('have.text', '251-257 of 257 (from 3193 total entries)');
      cy.get('[data-testid="FirstPageIcon"]').click();
      cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-50 of 257 (from 3193 total entries)');
      cy.get('[data-testid="LastPageIcon"]').click();
      cy.get('.MuiTablePagination-displayedRows').should('have.text', '251-257 of 257 (from 3193 total entries)');
      cy.get('[data-testid="FirstPageIcon"] > path').click();
      cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-50 of 257 (from 3193 total entries)'); 
    });

    it.skip('MER-T177-10: Should be able to display the graphs by clicking on Graph tab', function() {   
      /* ==== STEP 11 ==== */
      onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV');
      onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('caco2_CNV - PON_1000-N_C2_1000-T');
      cy.contains('QC Hotspots', { matchCase: false }).click({ force: true });
      // Hide/Pin/Unpin/Show column by column
      // Gene
      onMercuryValidationTestsPage.whenWeHideTableColumn('Gene')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns(['Gene'])
      onMercuryValidationTestsPage.whenWeShowTheTableColumn('Gene')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns(['Gene'])
      onMercuryValidationTestsPage.whenWeUnpinTheTableColumn('Gene')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns(['Gene'])
      // Variant
      onMercuryValidationTestsPage.whenWeHideTableColumn('Variant')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
        'HGVSc',
        'HGVSp'
      ])
      onMercuryValidationTestsPage.whenWeShowTheTableColumn('Variant')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
        'HGVSc',
        'HGVSp'
      ])
      onMercuryValidationTestsPage.whenWePinTheTableColumn('Variant')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
        'HGVSc',
        'HGVSp'
      ])
      onMercuryValidationTestsPage.whenWeUnpinTheTableColumn('Variant')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
        'HGVSc',
        'HGVSp'
      ])
      // Quality
      onMercuryValidationTestsPage.whenWeHideTableColumn('Quality')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
        'Global',
        'Coverage'
      ])
      onMercuryValidationTestsPage.whenWeShowTheTableColumn('Quality')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
        'Global',
        'Coverage'
      ])
      onMercuryValidationTestsPage.whenWePinTheTableColumn('Quality')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
        'Global',
        'Coverage'
      ])
      onMercuryValidationTestsPage.whenWeUnpinTheTableColumn('Quality')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
        'Global',
        'Coverage'
      ])
      // Status
      onMercuryValidationTestsPage.whenWeHideTableColumn('Status')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
        'Status'
      ])
      onMercuryValidationTestsPage.whenWeShowTheTableColumn('Status')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
        'Status'
      ])
      onMercuryValidationTestsPage.whenWePinTheTableColumn('Status')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
        'Status'
      ])
      onMercuryValidationTestsPage.whenWeUnpinTheTableColumn('Status')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
        'Status'
      ])
      // Score IG
      onMercuryValidationTestsPage.whenWeHideTableColumn('Score IG')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
        'Score IG'
      ])
      onMercuryValidationTestsPage.whenWeShowTheTableColumn('Score IG')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
        'Score IG'
      ])
      onMercuryValidationTestsPage.whenWePinTheTableColumn('Score IG')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
        'Score IG'
      ])
      onMercuryValidationTestsPage.whenWeUnpinTheTableColumn('Score IG')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
        'Score IG'
      ])
      // QScore N
      onMercuryValidationTestsPage.whenWeHideTableColumn('QScore N')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
        'QScore N'
      ])
      onMercuryValidationTestsPage.whenWeShowTheTableColumn('QScore N')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
        'QScore N'
      ])
      onMercuryValidationTestsPage.whenWePinTheTableColumn('QScore N')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
        'QScore N'
      ])
      onMercuryValidationTestsPage.whenWeUnpinTheTableColumn('QScore N')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
        'QScore N'
      ])
      // QScore T
      onMercuryValidationTestsPage.whenWeHideTableColumn('QScore T')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
        'QScore T'
      ])
      onMercuryValidationTestsPage.whenWeShowTheTableColumn('QScore T')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
        'QScore T'
      ])
      onMercuryValidationTestsPage.whenWePinTheTableColumn('QScore T')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
        'QScore T'
      ])
      onMercuryValidationTestsPage.whenWeUnpinTheTableColumn('QScore T')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
        'QScore T'
      ])
      // Mean Depth
      onMercuryValidationTestsPage.whenWeHideTableColumn('Mean Depth')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
        'Mean Depth'
      ])
      onMercuryValidationTestsPage.whenWeShowTheTableColumn('Mean Depth')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
        'Mean Depth'
      ])
      onMercuryValidationTestsPage.whenWePinTheTableColumn('Mean Depth')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
        'Mean Depth'
      ])
      onMercuryValidationTestsPage.whenWeUnpinTheTableColumn('Mean Depth')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
        'Mean Depth'
      ])
      // Report
      onMercuryValidationTestsPage.whenWeHideTableColumn('Report')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
        'Report'
      ])
      onMercuryValidationTestsPage.whenWeShowTheTableColumn('Report')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
        'Report'
      ])
      onMercuryValidationTestsPage.whenWeUnpinTheTableColumn('Report')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
        'Report'
      ])
      onMercuryValidationTestsPage.whenWePinTheTableColumnReport('Report')
      onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
        'Report'
      ])
    });

    it.skip('MER-T177-11: Should be able to display and hide columns on batches table', function() {   
      /* ==== STEP 12 ==== */
      onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV');
      onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('caco2_CNV - PON_1000-N_C2_1000-T');
      cy.contains('QC Hotspots', { matchCase: false }).click({ force: true });
      onMercuryValidationTestsPage.whenWeClickOnSmallToggleDensityIcon()
      onMercuryValidationTestsPage.thenWeEnlargeTable()
      onMercuryValidationTestsPage.whenWeClickOnLargeToggleDensityIcon()
      onMercuryValidationTestsPage.thenWeShouldSeeMediumSizeTable()
    });

    it.skip('MER-T177-12: Should be able to check QC page for various analysis', function() {   
      /* ==== STEP 12 ==== */
      onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV');
      onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('caco2_CNV - PON_1000-N_C2_1000-T');
      cy.contains('QC Hotspots', { matchCase: false }).click({ force: true });
      onMercuryValidationTestsPage.whenWeClickOnLargeFullScreenIcon()
      onMercuryValidationTestsPage.thenWeShouldDisplayTheTableInFullScreen()
      onMercuryValidationTestsPage.whenWeClickOnSmallFullScreenIcon()
      onMercuryValidationTestsPage.thenWeShouldDisplayTheTableInNormalSize()
    });

    it.skip('MER-T177-13: Should be able to check the inormations of step 12 with the prod environment', function() {   
      /* ==== STEP 13 ==== */
      onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV');
      onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('caco2_CNV - PON_1000-N_C2_1000-T');
      cy.contains('QC Hotspots', { matchCase: false }).click({ force: true });

      onMercuryValidationTestsPage.whenWeApplyFilter('Somatic mutated')
      onMercuryValidationTestsPage.thenWeShouldSeeTableResults('Somatic mutated', [
        'Somatic',
        'Somatic'
      ])
      onMercuryValidationTestsPage.whenWeApplyFilter('Germline mutated')
      onMercuryValidationTestsPage.thenWeShouldSeeTableResults('Germline mutated', [
        'No records to display'
      ])
      onMercuryValidationTestsPage.whenWeApplyFilter('Somatic Uncertain')
      onMercuryValidationTestsPage.thenWeShouldSeeTableResults('Somatic Uncertain', [
        'Not Mutated',
        'Not Mutated',
      ])

      onMercuryValidationTestsPage.whenWeApplyFilter('WT')
      onMercuryValidationTestsPage.thenWeShouldSeeTableResults('WT', [
        'Not Mutated',
        'Not Mutated',
        'Not Mutated',
        'Not Mutated',
        'Not Mutated',
        'Not Mutated',
        'Not Mutated'
      ])

      onMercuryValidationTestsPage.whenWeApplyFilter('Not Covered')
      onMercuryValidationTestsPage.thenWeShouldSeeTableResults('Not Covered', [
        'Not covered',
        'Not covered',
        'Not covered',
        'Not covered',
        'Not covered',
        'Not covered',
        'Not covered'
      ])

      onMercuryValidationTestsPage.whenWeApplyFilter('Pass')
      onMercuryValidationTestsPage.thenWeShouldSeeTableResults('Pass', [
        'Not Mutated',
        'Not Mutated',
        'Not Mutated',
        'Not Mutated',
        'Not Mutated',
        'Not Mutated',
        'Not Mutated'
      ])

      onMercuryValidationTestsPage.whenWeApplyFilter('Low coverage')
      onMercuryValidationTestsPage.thenWeShouldSeeTableResults('Low coverage', [
        'Not Mutated',
        'Not Mutated',
        'Not Mutated',
        'Not Mutated',
        'Not Mutated',
        'Not Mutated',
        'Not Mutated'
      ])

      onMercuryValidationTestsPage.whenWeApplyFilter('Failed')
      onMercuryValidationTestsPage.thenWeShouldSeeTableResults('Failed', [
        'Not covered',
        'Not covered',
        'Not covered',
        'Not covered',
        'Not covered',
        'Not covered',
        'Not covered'
      ])

      onMercuryValidationTestsPage.whenWeSearchGeneName('GNA11')
      onMercuryValidationTestsPage.thenWeShouldSeeTableGenesResults([
        'GNA11',
        'GNA11',
        'GNA11',
        'GNA11',
        'GNA11'
      ])
      onMercuryValidationTestsPage.whenWeSearchVariantName('c.548G>A')
      onMercuryValidationTestsPage.thenWeShouldSeeTableVariantsResults([
        'c.548G>A',
        'c.548G>A'
      ])
    });

    it('Should display the time load of the main homepage', () => {
      cy.displayTimeLoadOf()
    })
  })
 
  
 

 
  






  /*
    IN PROGRESS (ATTENTE BASE DE TESTS)
  */

  // TODO: STEPS 10 ET 12
  describe('MER-T162 (1.0): Page CNV - Filtres', () => {
    beforeEach(function () {
      onMercurySmokeTestsPage.givenWeAreOnTheLoginPage()
      /* ==== STEP 1 ==== */
      onMercurySmokeTestsPage.whenWeLoginToMercuryWithTheAccess('bioinf', 'bioinf')
      cy.viewport(1280, 720)
    })
    // Vérifier que toutes les infos de qualité et de couverture au niveau de chaque gène d'intérêt sont disponibles et intégrables au rapport
    // Uniquement pour les analyses de panels de gènes
    it('MER-T162-2: Should be on the analysis CNV page', function() {   
      /* ==== STEP 2 ==== */
      onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV')
      onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('caco2_CN')
      cy.contains('caco2_CNV - PON_1000-N_C2_1000-T', { matchCase: false })
      cy.contains('CNV', { matchCase: false }).should('be.visible').click({force: true})
      onMercuryValidationTestsPage.thenWeAreOnCNVPageOfAnalysis('caco2_CNV - PON_1000-N_C2_1000-T');
    });

    it('MER-T162-3: Should be able to search by gene name', function() {   
      /* ==== STEP 3 ==== */
      onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV')
      onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('caco2_CN')
      cy.contains('caco2_CNV - PON_1000-N_C2_1000-T', { matchCase: false })
      cy.contains('CNV', { matchCase: false }).should('be.visible').click({force: true})
      onMercuryValidationTestsPage.thenWeAreOnCNVPageOfAnalysis('caco2_CNV - PON_1000-N_C2_1000-T');
      onMercuryValidationTestsPage.whenWeSearchForGeneNames('AXL');
      onMercuryValidationTestsPage.thenWeShouldSeeTableGenesResults([
        'AXL',
      ])
      onMercuryValidationTestsPage.whenWeSearchForGeneNames('WT1');
      onMercuryValidationTestsPage.thenWeShouldSeeTableGenesResults([
        'WT1',
      ])
      onMercuryValidationTestsPage.whenWeSearchForGeneNames('USP6');
      onMercuryValidationTestsPage.thenWeShouldSeeTableGenesResults([
        'USP6',
      ])
      onMercuryValidationTestsPage.whenWeSearchForGeneNames('ERROR_GENE_NAME');
      onMercuryValidationTestsPage.thenTheSearchButtonIsDisabled()
    });

    it('MER-T162-4: Should be able to apply min size or max size on the analysis CNV page', function() {   
      /* ==== STEP 4 ==== */
      onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV')
      onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('caco2_CN')
      cy.contains('caco2_CNV - PON_1000-N_C2_1000-T', { matchCase: false })
      cy.contains('CNV', { matchCase: false }).should('be.visible').click({force: true})
      onMercuryValidationTestsPage.thenWeAreOnCNVPageOfAnalysis('caco2_CNV - PON_1000-N_C2_1000-T');
      onMercuryValidationTestsPage.whenWeTypeGeneMinSizeWith('90');
      onMercuryValidationTestsPage.whenWeTypeGeneMaxSizeWith('100');
      onMercuryValidationTestsPage.thenWeShouldSeeTableSizeResults([
        '96',
      ])
      onMercuryValidationTestsPage.whenWeTypeGeneMinSizeWith('80');
      onMercuryValidationTestsPage.whenWeTypeGeneMaxSizeWith('100');
      onMercuryValidationTestsPage.thenWeShouldSeeTableSizeResults([
        '96',
        '87',
      ])
      onMercuryValidationTestsPage.whenWeTypeGeneMinSizeWith('60');
      onMercuryValidationTestsPage.whenWeTypeGeneMaxSizeWith('100');
      onMercuryValidationTestsPage.thenWeShouldSeeTableSizeResults([
        '65',
        '96',
        '87',
        '70',
      ])
    });

    it('MER-T162-5-to-9: Should be able to apply filters on the analysis CNV page', function() {   
      /* ==== STEP 5 to 9 ==== */
      onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV')
      onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('caco2_CN')
      cy.contains('caco2_CNV - PON_1000-N_C2_1000-T', { matchCase: false })
      cy.contains('CNV', { matchCase: false }).should('be.visible').click({force: true})
      onMercuryValidationTestsPage.thenWeAreOnCNVPageOfAnalysis('caco2_CNV - PON_1000-N_C2_1000-T');
      onMercuryValidationTestsPage.whenWeApplyCNVFilter('Gain');
      onMercuryValidationTestsPage.thenWeShouldSeeCNVTableResults('Gain', [
        'GAIN',
        'GAIN',
        'GAIN',
        'GAIN',
        'GAIN',
        'GAIN',
        'GAIN'
      ])
      onMercuryValidationTestsPage.whenWeApplyCNVFilter('Loss');
      onMercuryValidationTestsPage.thenWeShouldSeeCNVTableResults('Loss', [
        'LOSS',
        'LOSS',
        'LOSS',
        'LOSS',
        'LOSS',
        'LOSS',
        'LOSS'
      ])
      onMercuryValidationTestsPage.whenWeApplyCNVFilter('Amplification');
      onMercuryValidationTestsPage.thenWeShouldSeeCNVTableResults('Amplification', [
        'AMPLIFICATION',
        'AMPLIFICATION',
        'AMPLIFICATION',
        'AMPLIFICATION',
        'AMPLIFICATION',
        'AMPLIFICATION',
        'AMPLIFICATION'
      ])
      onMercuryValidationTestsPage.whenWeApplyCNVFilter('Deletion');
      onMercuryValidationTestsPage.thenWeShouldSeeCNVTableResults('Deletion', [
        'DELETION',
        'DELETION',
        'DELETION',
        'DELETION',
        'DELETION',
      ])
      onMercuryValidationTestsPage.whenWeApplyCNVFilter('cnLOH');
      onMercuryValidationTestsPage.thenWeShouldSeeCNVTableResults('cnLOH', [
        'CNLOH',
        'CNLOH',
        'CNLOH',
        'CNLOH',
        'CNLOH',
        'CNLOH',
        'CNLOH'
      ])
    });

    // TODO: STEP 10 -> SLIDERS / ATTENTE DE BASE DE TEST
    it.skip('MER-T162-10: Should be able to apply Amplification and Deletion threshold on the analysis CNV page', function() {   
      /* ==== STEP 10 ==== */
      onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV')
      onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('caco2_CN')
      cy.contains('caco2_CNV - PON_1000-N_C2_1000-T', { matchCase: false })
      cy.contains('CNV', { matchCase: false }).should('be.visible').click({force: true})
      onMercuryValidationTestsPage.thenWeAreOnCNVPageOfAnalysis('caco2_CNV - PON_1000-N_C2_1000-T');
      onMercuryValidationTestsPage.whenWeApplyCNVFilter('Amplification');
      onMercuryValidationTestsPage.andWeSlideAmplificationThresholdTo('15');
      // onMercuryValidationTestsPage.thenWeShouldSeeCNVTableWithoutRecords('No records to display')
      
      // onMercuryValidationTestsPage.whenWeApplyCNVFilter('Amplification');
      // onMercuryValidationTestsPage.andWeSlideAmplificationThresholdTo('5.1');
      // onMercuryValidationTestsPage.thenWeShouldSeeCNVTableResults('Amplification', [
      //   'AMPLIFICATION',
      //   'AMPLIFICATION',
      //   'AMPLIFICATION',
      //   'AMPLIFICATION',
      //   'AMPLIFICATION',
      //   'AMPLIFICATION',
      //   'AMPLIFICATION'
      // ])    
    });

    it('MER-T162-11: Should be able to Reset filters on the analysis CNV page', function() {   
      /* ==== STEP 11 ==== */
      onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV')
      onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('caco2_CN')
      cy.contains('caco2_CNV - PON_1000-N_C2_1000-T', { matchCase: false })
      cy.contains('CNV', { matchCase: false }).should('be.visible').click({force: true})
      onMercuryValidationTestsPage.thenWeAreOnCNVPageOfAnalysis('caco2_CNV - PON_1000-N_C2_1000-T');
      onMercuryValidationTestsPage.thenWeShouldSeeSlider('Amplification threshold minimum :', '2.2')
      onMercuryValidationTestsPage.andWeShouldSeeSlider('Deletion threshold maximum:', '1.8')
      onMercuryValidationTestsPage.whenWeUncheckAllTheFilters()
      onMercuryValidationTestsPage.thenWeShouldSeeFilter('Gain', 'unchecked')
      onMercuryValidationTestsPage.andWeShouldSeeFilter('Amplification', 'unchecked')
      onMercuryValidationTestsPage.andWeShouldSeeFilter('Loss', 'unchecked')
      onMercuryValidationTestsPage.andWeShouldSeeFilter('Deletion', 'unchecked')
      onMercuryValidationTestsPage.andWeShouldSeeFilter('cnLOH', 'unchecked')
      onMercuryValidationTestsPage.whenWeApplyTheseFilters()
      onMercuryValidationTestsPage.andWeResetFilters('cnLOH')
      onMercuryValidationTestsPage.thenWeShouldSeeSlider('Amplification threshold minimum :', '2.2')
      onMercuryValidationTestsPage.andWeShouldSeeSlider('Deletion threshold maximum:', '1.8')
      onMercuryValidationTestsPage.andWeShouldSeeFilter('Gain', 'checked')
      onMercuryValidationTestsPage.andWeShouldSeeFilter('Amplification', 'checked')
      onMercuryValidationTestsPage.andWeShouldSeeFilter('Loss', 'checked')
      onMercuryValidationTestsPage.andWeShouldSeeFilter('Deletion', 'checked')
      onMercuryValidationTestsPage.andWeShouldSeeFilter('cnLOH', 'checked')
    });

    // TODO: STEP 10 ET 12 -> SLIDERS ET REGISTER FILTER / ATTENTE DE BASE DE TEST
    it.skip('MER-T162-12: Should be able to register favorite filter Tests Cypress on the analysis CNV page', function() {   
      /* ==== STEP 12 ==== */
      onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV')
      onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('caco2_CN')
      cy.contains('caco2_CNV - PON_1000-N_C2_1000-T', { matchCase: false })
      cy.contains('CNV', { matchCase: false }).should('be.visible').click({force: true})
      onMercuryValidationTestsPage.thenWeAreOnCNVPageOfAnalysis('caco2_CNV - PON_1000-N_C2_1000-T');
      cy.contains('RESET FILTERS', { matchCase: false }).click({ force: true });
      onMercuryValidationTestsPage.whenWeUncheckAllTheFilters()
      onMercuryValidationTestsPage.andWeCheckFilter('Gain')
      onMercuryValidationTestsPage.thenWeShouldSeeFilter('Gain', 'checked')
      onMercuryValidationTestsPage.andWeShouldSeeFilter('Amplification', 'unchecked')
      onMercuryValidationTestsPage.andWeShouldSeeFilter('Loss', 'unchecked')
      onMercuryValidationTestsPage.andWeShouldSeeFilter('Deletion', 'unchecked')
      onMercuryValidationTestsPage.andWeShouldSeeFilter('cnLOH', 'unchecked')
      // //Register filter
      // onMercuryValidationTestsPage.whenWeRegisterFilterAs('Tests Cypress')
      // onMercuryValidationTestsPage.thenWeShouldSeeTheListedFilterRegistered('Tests Cypress')
    });

    // TODO: STEP 12 BIS -> SLIDERS ET REGISTER FILTER / ATTENTE DE BASE DE TEST
    it.skip('MER-T162-12-Bis: Should be able to apply the previous favorite filter Tests Cypress on the analysis CNV page', function() {   
      /* ==== STEP 12 ==== */
      onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV')
      onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('caco2_CN')
      cy.contains('caco2_CNV - PON_1000-N_C2_1000-T', { matchCase: false })
      cy.contains('CNV', { matchCase: false }).should('be.visible').click({force: true})
      onMercuryValidationTestsPage.thenWeAreOnCNVPageOfAnalysis('caco2_CNV - PON_1000-N_C2_1000-T');
      cy.contains('RESET FILTERS', { matchCase: false }).click({ force: true });
      // onMercuryValidationTestsPage.whenWeSelectFilter('Tests Cypress')
      // onMercuryValidationTestsPage.thenWeShouldSeeFilter('Gain', 'checked')
      // onMercuryValidationTestsPage.andWeShouldSeeFilter('Amplification', 'unchecked')
      // onMercuryValidationTestsPage.andWeShouldSeeFilter('Loss', 'unchecked')
      // onMercuryValidationTestsPage.andWeShouldSeeFilter('Deletion', 'unchecked')
      // onMercuryValidationTestsPage.andWeShouldSeeFilter('cnLOH', 'unchecked')
    });

    it('Should display the time load of the main homepage', () => {
      cy.displayTimeLoadOf()
    })
  })

  // TODO: Ajouter le ou les variants au rapport clinique dans la future base de tests (Step 3)
  describe('MER-T170 (1.0): Tester les intégrations dans les rapports cliniques', () => {
    before(function () {
      onMercurySmokeTestsPage.givenWeAreOnTheLoginPage()
    })
    // Vérifier que toutes les infos de qualité et de couverture au niveau de chaque gène d'intérêt sont disponibles et intégrables au rapport
    // Uniquement pour les analyses de panels de gènes
    it('MER-T170: Tester les intégrations dans les rapports cliniques', function() {
      /* ==== STEP 1 ==== */
      onMercurySmokeTestsPage.whenWeFillInLoginFieldWith('bioinf')
      onMercurySmokeTestsPage.andWeFillInPasswordFieldWith('bioinf')
      onMercurySmokeTestsPage.andWeClickOnSubmitButton()
      onMercurySmokeTestsPage.thenWeShouldBeLoggedOnTheMainHomePageLocatedAtUrl('https://mercury-react-kqwuw7jkta-ew.a.run.app/')
      /* ==== STEP 2 ==== */
      cy.get(':nth-child(1) > .css-ojvzib > .MuiTypography-root').click({force: true});
      cy.get('[style="transform: translate(10px, 1270px); width: 445px; height: 95px; position: absolute;"] > .MuiPaper-root > .css-ozvo54 > .css-8v90jo > .css-hp68mp > .css-0').click({force: true});
      onMercurySmokeTestsPage.thenWeShouldBeLoggedOnThePageLocatedAtUrl('https://mercury-react-kqwuw7jkta-ew.a.run.app/analyzes/11491/overview')
      cy.get('.MuiList-root > :nth-child(2) > .MuiTypography-root').click({force: true});
      cy.get('.MuiList-root > :nth-child(2) > .MuiTypography-root').click({force: true});
      cy.get(':nth-child(4) > [data-testid="ExpandMoreIcon"]').click({force: true});
      cy.get('[href="/analyzes/11491/qc/genes"]').click({force: true});
      onMercurySmokeTestsPage.thenWeShouldBeLoggedOnThePageLocatedAtUrl('https://mercury-react-kqwuw7jkta-ew.a.run.app/analyzes/11491/qc/genes')
      cy.get(':nth-child(2) > .css-12ppf1e > .css-1yjo05o > .MuiIconButton-root > [data-testid="CommentIcon"] > path').click();
      // On retrouve le commentaire en cliquant dessus
      cy.contains('Test Cypress.', { matchCase: false })
      cy.get('.MuiBox-root > .MuiLoadingButton-root').click();
      cy.get(':nth-child(5) > .css-12ppf1e > .css-1yjo05o > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
      cy.get(':nth-child(5) > .css-12ppf1e > .css-1yjo05o > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
      /* ==== STEP 3 ==== */
      // On vérifie que le fichier .csv a bien été uploader 
      cy.contains('Dashboard', { matchCase: false }).click({force: true});
      cy.get(':nth-child(36) > .css-ojvzib > .MuiTypography-root').click();
      cy.get('[style="transform: translate(10px, 1900px); width: 900px; height: 95px; position: absolute;"] > .MuiPaper-root > .MuiBox-root > .css-149sczi > .MuiTypography-inherit > .MuiTypography-root').click();
      cy.get('[style="transform: translate(10px, 1900px); width: 900px; height: 95px; position: absolute;"] > .MuiPaper-root > .MuiBox-root > .css-149sczi > .MuiAvatar-root > [data-testid="CloudDownloadIcon"] > path').should('have.attr', 'd', 'M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z');
      cy.downloadedFileExists('LACDON0704-CN_LACDON0704-CT_LACDON0704.csv')
    });

    it('Should display the time load of the main homepage', () => {
      cy.displayTimeLoadOf()
    })
  })

  // TODO: créer un filtre Validation_date_1 dans la future base de tests (STEP 7)
  // TODO: modifier Validation_date_1 dans la future base de tests (STEP 7)
  describe('MER-T171 (1.0): Page Fusions - Filtres', () => {
    before(function () {
      onMercurySmokeTestsPage.givenWeAreOnTheLoginPage()
    })
    // Vérifier que toutes les infos de qualité et de couverture au niveau de chaque gène d'intérêt sont disponibles et intégrables au rapport
    // Uniquement pour les analyses de panels de gènes
    it('MER-T171: Page Fusions - Filtres', function() {
      /* ==== STEP 1 ==== */
      onMercurySmokeTestsPage.whenWeFillInLoginFieldWith('bioinf')
      onMercurySmokeTestsPage.andWeFillInPasswordFieldWith('bioinf')
      onMercurySmokeTestsPage.andWeClickOnSubmitButton()
      onMercurySmokeTestsPage.thenWeShouldBeLoggedOnTheMainHomePageLocatedAtUrl('https://mercury-react-kqwuw7jkta-ew.a.run.app/')
      /* ==== STEP 2 ==== */
      cy.contains('PPD_GHDC_OD6', { matchCase: false }).click({force: true});
      onMercurySmokeTestsPage.thenWeShouldBeLoggedOnThePageLocatedAtUrl('https://mercury-react-kqwuw7jkta-ew.a.run.app/analyzes/11402/overview')
      /* ==== STEP 3 ==== */
      cy.contains('FUSIONS OF INTEREST', { matchCase: false }).click({force: true});
      cy.get('.css-djfak1 > .MuiTypography-root').click();
      onMercurySmokeTestsPage.thenWeShouldBeLoggedOnThePageLocatedAtUrl('https://mercury-react-kqwuw7jkta-ew.a.run.app/analyzes/11402/fusions')
      cy.get('.MuiTypography-root > span').should('have.text', 'PPD_GHDC_OD6 - PPD_PE9974_RP8686');
      cy.get('#mui-139').should('be.visible');
      cy.get('#mui-140').click();
      cy.get('#mui-140').should('be.visible');
      cy.get('#mui-component-select-filter').should('be.visible');
      cy.get('#tags-standard').click();
      cy.get('#tags-standard').should('be.visible');

      /* ==== STEP 4 ==== */
      cy.get('#fusions-filters > .MuiBox-root').click();
      cy.get('#mui-139').clear('1');
      cy.get('#mui-139').type('12');
      cy.get('.MuiLoadingButton-root').click();
      cy.get('[aria-label=""]').should('have.text', 'LINC01393 ');
      cy.get('.css-1i2rdf > .MuiTypography-root').should('have.text', '12');
      cy.get('.css-1i2rdf > .MuiTypography-root').should('be.visible');
      cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-1 of 1 (from 4 total entries)');
      cy.get('.css-55am1q').should('have.text', 't(7;7)(q31.2;q31.2)');
      cy.get('.css-10wu4ab').should('have.text', '+/+');
      cy.get('.css-kp6es8 > .MuiTypography-root').should('have.text', 'PASS');
      cy.get('.css-13x51uj > .MuiTypography-root').should('have.text', '1.99');
      cy.get('.css-1c42588').should('have.text', 'chr7:115030768-chr7:116731668');
      cy.get('.MuiGrid-grid-md-4').click();
      cy.get('#mui-139').clear();
      cy.get('#mui-139').type('0');
      cy.get('.MuiLoadingButton-root').click();
      cy.get('.MuiGrid-grid-md-4').click();
      cy.get('#mui-140').clear();
      cy.get('#mui-140').type('10');
      cy.get('.MuiLoadingButton-root').click();
      cy.get('#mui-140').clear('1');
      cy.get('#mui-140').type('1');
      cy.get('.MuiLoadingButton-root').click();
      cy.get('#mui-140').click();
      cy.get('#mui-140').should('have.value', '1');
      cy.get('.css-u4p24i > :nth-child(3)').should('have.text', 'NRXN1 ');
      cy.get('.css-55am1q').should('have.text', 't(2;2)(p21;p16.3)');
      cy.get('.css-10wu4ab').should('have.text', '+/-');
      cy.get('.css-kp6es8 > .MuiTypography-root').should('have.text', 'PASS');
      cy.get('.css-imhtwa > .MuiTypography-root').should('have.text', '2');
      cy.get('.css-1i2rdf > .MuiTypography-root').should('have.text', '8');
      cy.get('.css-13x51uj > .MuiTypography-root').should('have.text', '1.66');
      cy.get('.css-1c42588').should('have.text', 'chr2:42169636-chr2:50623615');
      cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-1 of 1 (from 4 total entries)');
      cy.get('.MuiGrid-grid-md-4').click();
      cy.get('#mui-140').clear();
      cy.get('#mui-140').type('0');
      cy.get('.MuiLoadingButton-root').click();
      cy.get('.MuiTable-root').click();
      cy.get('.MuiTable-root').click();
      cy.get(':nth-child(1) > .css-kp6es8 > .MuiTypography-root').should('have.text', 'PASS');
      cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-4 of 4 (from 4 total entries)');
      cy.scrollTo('top')
      cy.get('#mui-component-select-filter').click({force: true});
      cy.get('[data-value="Low_expressed"]').click({force: true});
      cy.get('.MuiLoadingButton-root').click();
      cy.get('td > .MuiTypography-root').should('have.text', 'No records to display');
      cy.get('#mui-component-select-filter').click({force: true});
      cy.get('[data-value="all"]').click({force: true});
      cy.get('.MuiLoadingButton-root').click();
      cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-4 of 4 (from 4 total entries)');
      /* ==== End Cypress Studio ==== */
      /* ==== STEP 5 ==== */
      cy.get('.MuiButton-outlined').click();
      cy.get('#mui-139').should('have.value', '0');
      cy.get('#mui-140').click();
      cy.get('#mui-140').should('have.value', '0');
      cy.get('#mui-component-select-filter').should('have.text', 'Pass');
      cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-4 of 4 (from 4 total entries)');
      cy.get('.css-j7qwjs > :nth-child(1) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('not.be.checked');
      cy.get(':nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('not.be.checked');
      /* ==== STEP 6 ==== */
      // Update filter
      cy.contains('Manage your favorite filters', { matchCase: false }).click({force: true});
      cy.get(':nth-child(1) > .MuiBox-root > .css-hp68mp').click();
      cy.get('input[type="text"][value="Validation_date"]').should('have.value', 'Validation_date');
      cy.get('[data-testid="SaveIcon"] > path').click();
      cy.get('.Toastify__toast-body > :nth-child(2)').should('have.text', 'Favorite filter updated');
      /* ==== STEP 7 ==== */
     
    });

    it('Should display the time load of the main homepage', () => {
      cy.displayTimeLoadOf()
    })
  })

  describe('MER-T248 (1.0): Somatic - Filtres', () => {

    beforeEach(function () {
      onMercurySmokeTestsPage.givenWeAreOnTheLoginPage()
      onMercurySmokeTestsPage.whenWeFillInLoginFieldWith('bioinf')
      onMercurySmokeTestsPage.andWeFillInPasswordFieldWith('bioinf')
      onMercurySmokeTestsPage.andWeClickOnSubmitButton()
      onMercurySmokeTestsPage.thenWeShouldBeLoggedOnTheMainHomePageLocatedAtUrl('https://mercury-react-kqwuw7jkta-ew.a.run.app/')
      cy.get('.MuiList-root > :nth-child(1)').should('have.text', 'Dashboard');
      cy.contains('Analyzes', { matchCase: false })
      cy.get('input[type="text"][placeholder="Search by analysis name, sequenceur, capture kit, batch name"]').clear();
      cy.get('input[type="text"][placeholder="Search by analysis name, sequenceur, capture kit, batch name"]').type(`caco2_CNV{enter}`, { force: true });
      cy.contains('caco2_CNV', { matchCase: false }).click({ force: true });
      onMercurySmokeTestsPage.thenWeShouldBeLoggedOnThePageLocatedAtUrl('https://mercury-react-kqwuw7jkta-ew.a.run.app/analyzes/11328/overview')
      cy.viewport(1280, 720)
    })

    it('MER-T248: Somatic - Filtres - Recherche par gènes', () => {
      /* ==== STEP 2 ==== */
      cy.contains('Somatic', { matchCase: false }).click({ force: true });
      // cy.get('[href="/analyzes/11328/somatic"]').click({ force: true });
      cy.get('.css-djfak1 > .MuiTypography-root > span').should('have.text', 'caco2_CNV - PON_1000-N_C2_1000-T');
      cy.get('[href="/analyzes/11328/somatic"]').should('have.text', 'Somatic');
      /* ==== STEP 3 ==== */
      cy.contains('RESET FILTERS', { matchCase: false }).click({ force: true });
      cy.get('#tags-standard').type(`SMAD4{enter}`, { force: true });
      cy.get('.css-tzsjye > .MuiTypography-root').should('have.text', 'All gene names are valid');
      cy.get('[style="max-height: 150px; overflow-y: auto;"] > .MuiButtonBase-root > .MuiChip-label').should('have.text', 'SMAD4');
      cy.get('.MuiLoadingButton-root').click();
      cy.get('.css-1yjo05o > .MuiTypography-root').should('have.text', 'SMAD4 ');
      cy.get('.css-1abzdwk > .MuiTypography-root').should('have.text', 'p.Asp351His');
      cy.get('.css-1k4f1n7 > .MuiTypography-root').should('have.text', 'NM_005359.6:c.1051G>C');
      cy.get('.css-bunum9 > .MuiTypography-root').should('have.text', 'chr18:51065518');
      cy.get('.css-1gk0r45 > .MuiTypography-root').should('have.text', '0.27');
      cy.get('.css-11rxa8m > .MuiTypography-root').should('have.text', '1.16');
      cy.get('.css-vhxi4b > .MuiTypography-root').should('have.text', '100');
      cy.get('.css-xf8rte > .MuiTypography-root').should('have.text', '460');
      cy.get('.css-8qp4i4 > :nth-child(1) > :nth-child(1) > .MuiChip-root > .MuiChip-label > [data-testid="LocalFireDepartmentIcon"]').should('be.visible');
      cy.get(':nth-child(2) > .css-ly0uma > .MuiChip-root > .MuiChip-label > [data-testid="AdjustIcon"]').should('be.visible');
      cy.get(':nth-child(2) > .MuiChip-root > .MuiChip-label > .css-u4p24i > .MuiBox-root').should('have.text', '3D');
      cy.get('.css-vb6e92 > .MuiTypography-root').should('have.text', 'missense');
      cy.get('[data-testid="CancelIcon"]').click();
      cy.contains('RESET FILTERS', { matchCase: false }).click({ force: true });
    })

    it('MER-T248: Somatic - Filtres - Recherche par type de mutations', () => { 
      /* ==== STEP 2 ==== */
      cy.contains('Somatic', { matchCase: false }).click({ force: true });
      // cy.get('[href="/analyzes/11328/somatic"]').click({ force: true });
      cy.get('.css-djfak1 > .MuiTypography-root > span').should('have.text', 'caco2_CNV - PON_1000-N_C2_1000-T');
      cy.get('[href="/analyzes/11328/somatic"]').should('have.text', 'Somatic');
      /* ==== STEP 4 ==== */
      cy.contains('RESET FILTERS', { matchCase: false }).click({ force: true });
      cy.get('.css-d0uhtl > :nth-child(1) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
      cy.get('.css-d0uhtl > :nth-child(2) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
      cy.get('.css-d0uhtl > :nth-child(1) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').should('not.be.checked');
      cy.get('.css-d0uhtl > :nth-child(2) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').should('not.be.checked');
      cy.get('.css-d0uhtl > :nth-child(1) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
      cy.get('.css-amaadx > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').contains('SMAD4');
      cy.contains('Cancer hotspots');
      cy.get(':nth-child(4) > .MuiFormControl-root > :nth-child(4) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
      cy.get('.MuiLoadingButton-root').click();
      cy.get('.css-d0uhtl > :nth-child(1) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
      cy.get('.css-d0uhtl > :nth-child(2) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
      cy.get('.MuiLoadingButton-root').click();
      cy.get('.css-1yjo05o > .MuiTypography-root').contains('SMAD4');
      cy.get(':nth-child(2) > .MuiChip-root > .MuiChip-label > .css-u4p24i > [data-testid="LocalFireDepartmentIcon"]').should('be.visible');
      cy.contains('3D Hotspots');
      cy.get('.css-d0uhtl > :nth-child(2) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
      cy.get(':nth-child(4) > .MuiFormControl-root > :nth-child(4) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
      cy.get('.css-1dmvi4v > :nth-child(1) > .MuiBox-root').should('have.text', 'SNV');
      cy.get('.css-1dmvi4v > :nth-child(2) > .MuiBox-root').should('have.text', 'MNV');
      cy.get('.css-1dmvi4v > :nth-child(3) > .MuiBox-root').should('have.text', 'Indel');
      cy.get('.MuiLoadingButton-root').click();
      cy.get(':nth-child(1) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').contains('APC');
      cy.get(':nth-child(1) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiChip-root > .MuiChip-label > [data-testid="AdjustIcon"] > path').should('be.visible');
      cy.get(':nth-child(1) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').contains('SNV');
      cy.get(':nth-child(3) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').contains('MGA');
      cy.get(':nth-child(3) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').contains('Deletion');
      cy.get('.MuiButton-outlined').click();
    })

    it('MER-T248: Somatic - Filtres - Recherche par type CNV', () => {
      /* ==== STEP 2 ==== */
      cy.contains('Somatic', { matchCase: false }).click({ force: true });
      // cy.get('[href="/analyzes/11328/somatic"]').click({ force: true });
      cy.get('.css-djfak1 > .MuiTypography-root > span').should('have.text', 'caco2_CNV - PON_1000-N_C2_1000-T');
      cy.get('[href="/analyzes/11328/somatic"]').should('have.text', 'Somatic');
      /* ==== STEP 5 ==== */
      cy.contains('RESET FILTERS', { matchCase: false }).click({ force: true });
      cy.get('.MuiFormControl-root > :nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
      cy.get('.MuiFormControl-root > :nth-child(2) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Amplification');
      cy.get('.MuiFormControl-root > :nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
      cy.get('.MuiLoadingButton-root').click();
      cy.get(':nth-child(4) > .MuiFormControl-root > :nth-child(4) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
      cy.get('.css-d0uhtl > :nth-child(2) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
      cy.get('.css-d0uhtl > :nth-child(1) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
      cy.get('.MuiLoadingButton-root').click();
      cy.get(':nth-child(1) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ARFRP1 ');
      cy.get(':nth-child(1) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'Amplification');
      cy.get(':nth-child(2) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ASXL1 ');
      cy.get(':nth-child(2) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'Amplification');
      cy.get(':nth-child(3) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ASXL1 ');
      cy.get(':nth-child(3) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'Amplification');
      cy.get(':nth-child(4) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'AURKA ');
      cy.get(':nth-child(4) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'Amplification');
      cy.get(':nth-child(5) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'AURKA ');
      cy.get(':nth-child(5) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'Amplification');
      cy.get('.MuiFormControl-root > :nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
      cy.get('.MuiFormControl-root > :nth-child(3) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
      cy.get('.MuiFormControl-root > :nth-child(3) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Gain');
      cy.get('.MuiFormControl-root > :nth-child(3) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('have.value', 'Gain');
      cy.get('.MuiLoadingButton-root').click();
      cy.get(':nth-child(1) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ABI1 ');
      cy.get(':nth-child(1) > .css-1a0r1sq').click();
      cy.get(':nth-child(1) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'Gain');
      cy.get(':nth-child(2) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ABL1 ');
      cy.get(':nth-child(2) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'Gain');
      cy.get(':nth-child(3) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ACSL3 ');
      cy.get(':nth-child(3) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'Gain');
      cy.get('.MuiFormControl-root > :nth-child(3) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
      cy.get(':nth-child(5) > .MuiFormControl-root > :nth-child(4) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
      cy.get('.MuiFormControl-root > :nth-child(4) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Loss');
      cy.get(':nth-child(5) > .MuiFormControl-root > :nth-child(4) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
      cy.get('.MuiLoadingButton-root').click();
      cy.get(':nth-child(1) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ABL2 ');
      cy.get(':nth-child(1) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'Loss');
      cy.get(':nth-child(2) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ADGRA2 ');
      cy.get(':nth-child(2) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'Loss');
      cy.get(':nth-child(3) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'AFF1 ');
      cy.get(':nth-child(3) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'Loss');
      cy.get('.MuiFormControl-root > :nth-child(5) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
      cy.get(':nth-child(5) > .MuiFormControl-root > :nth-child(4) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
      cy.get('.MuiFormControl-root > :nth-child(5) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Deletion');
      cy.get('.MuiFormControl-root > :nth-child(5) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.enabled');
      cy.get('.MuiLoadingButton-root').click();
      cy.get('.css-1yjo05o > .MuiTypography-root').should('have.text', 'PTPRD ');
      cy.get('.css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'Deletion');
      //Deletion
      cy.get('.MuiFormControl-root > :nth-child(5) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
      cy.get('.MuiFormControl-root > :nth-child(6) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
      cy.get('.MuiFormControl-root > :nth-child(6) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'cnLOH');
      cy.get('.MuiFormControl-root > :nth-child(6) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
      cy.get('.MuiLoadingButton-root').click();
      cy.get(':nth-child(1) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ABL1 ');
      cy.get(':nth-child(1) > .css-1a0r1sq > .css-8qp4i4').click();
      cy.get(':nth-child(1) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'cnLOH');
      cy.get(':nth-child(2) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ABL2 ');
      cy.get(':nth-child(2) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'cnLOH');
      cy.get(':nth-child(3) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'AKT1 ');
      cy.get(':nth-child(3) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'cnLOH');
      cy.get('.MuiButton-outlined').click();
    })

    it('MER-T248: Somatic - Filtres - Recherche par ACMG Classification', () => {
      /* ==== STEP 2 ==== */
      cy.contains('Somatic', { matchCase: false }).click({ force: true });
      // cy.get('[href="/analyzes/11328/somatic"]').click({ force: true });
      cy.get('.css-djfak1 > .MuiTypography-root > span').should('have.text', 'caco2_CNV - PON_1000-N_C2_1000-T');
      cy.get('[href="/analyzes/11328/somatic"]').should('have.text', 'Somatic');
      /* ==== STEP 6 ==== */
      cy.contains('RESET FILTERS', { matchCase: false }).click({ force: true });
      cy.get('.css-wwc21z > :nth-child(6) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
      cy.get('.css-wwc21z > :nth-child(5) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
      cy.get('.css-wwc21z > :nth-child(4) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
      cy.get('.css-wwc21z > :nth-child(3) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
      cy.get('.css-wwc21z > :nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
      cy.get('.css-wwc21z > :nth-child(1) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
      cy.get('.css-wwc21z > :nth-child(6) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Pathogenic');
      cy.get('.css-wwc21z > :nth-child(6) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
      cy.get('.css-wwc21z > :nth-child(6) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
      cy.get('.MuiLoadingButton-root').click();
      cy.get('.css-amaadx > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').contains('SMAD4');
      cy.get('.css-11c9j2a > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').contains('APC');
      cy.get('.css-amaadx > .css-1a60wmb > .css-1abzdwk > .css-l5c1s3 > .css-ly0uma > .MuiButtonBase-root > .MuiChip-label').click();
      cy.get('.MuiFormGroup-root > :nth-child(1) > .MuiTypography-root').should('have.text', 'Pathogenic');
      cy.get('[data-testid="CloseIcon"]').click();
      cy.get('.css-11c9j2a > .css-1a60wmb > .css-1abzdwk > .css-l5c1s3 > .css-ly0uma > .MuiButtonBase-root > .MuiChip-label').click();
      cy.get('.MuiFormGroup-root > :nth-child(1) > .MuiTypography-root').should('have.text', 'Pathogenic');
      cy.get('[data-testid="CloseIcon"]').click();
      cy.get('.css-wwc21z > :nth-child(5) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
      cy.get('.css-wwc21z > :nth-child(6) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
      cy.get('.css-wwc21z > :nth-child(5) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Likely pathogenic');
      cy.get('.css-wwc21z > :nth-child(5) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
      cy.get('.MuiButton-startIcon > [data-testid="SearchIcon"]').click();   
      cy.get(':nth-child(1) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ERBB3 ');
      cy.get(':nth-child(1) > .css-1a60wmb > .css-1abzdwk > .css-l5c1s3 > .css-ly0uma > .MuiButtonBase-root > .MuiChip-label').click();
      cy.get('.MuiBox-root > .MuiFormControl-root > .MuiFormGroup-root > :nth-child(2) > .MuiTypography-root').should('have.text', 'Likely pathogenic');
      cy.get('[data-testid="CloseIcon"]').click();
      cy.get(':nth-child(2) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'MGA ');
      cy.get(':nth-child(2) > .css-1a60wmb > .css-1abzdwk > .css-l5c1s3 > .css-ly0uma > .MuiButtonBase-root > .MuiChip-label').click();
      cy.get('.MuiBox-root > .MuiFormControl-root > .MuiFormGroup-root > :nth-child(2) > .MuiTypography-root').should('have.text', 'Likely pathogenic');
      cy.get('[data-testid="CloseIcon"]').click();
      cy.get(':nth-child(3) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'TP53 ');
      cy.get(':nth-child(3) > .css-1a60wmb > .css-1abzdwk > .css-l5c1s3 > .css-ly0uma > .MuiButtonBase-root > .MuiChip-label').click();
      cy.get('.MuiBox-root > .MuiFormControl-root > .MuiFormGroup-root > :nth-child(2) > .MuiTypography-root').should('have.text', 'Likely pathogenic');
      cy.get('[data-testid="CloseIcon"]').click();
      cy.get('.css-wwc21z > :nth-child(5) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
      cy.get('.css-wwc21z > :nth-child(4) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
      cy.get('.css-wwc21z > :nth-child(4) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Unknown significance (VUS)');
      cy.get('.css-wwc21z > :nth-child(4) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
      cy.get('.MuiLoadingButton-root').click();    
      cy.get(':nth-child(1) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ALK ');
      cy.get(':nth-child(1) > .css-1a60wmb > .css-1abzdwk > .css-l5c1s3 > .css-ly0uma > .MuiButtonBase-root > .MuiChip-label').click();
      cy.get('.MuiFormGroup-root > :nth-child(3) > .MuiTypography-root').should('have.text', 'Uncertain significance');
      cy.get('[data-testid="CloseIcon"]').click();
      cy.get(':nth-child(2) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'CTNNB1 ');
      cy.get(':nth-child(2) > .css-1a60wmb > .css-1abzdwk > .css-l5c1s3 > .css-ly0uma > .MuiButtonBase-root > .MuiChip-label').click();
      cy.get('.MuiFormGroup-root > :nth-child(3) > .MuiTypography-root').should('have.text', 'Uncertain significance');
      cy.get('[data-testid="CloseIcon"]').click();
      cy.get(':nth-child(3) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ERG ');
      cy.get(':nth-child(3) > .css-1a60wmb > .css-1abzdwk > .css-l5c1s3 > .css-ly0uma > .MuiButtonBase-root > .MuiChip-label').click();
      cy.get('.MuiFormGroup-root > :nth-child(3) > .MuiTypography-root').should('have.text', 'Uncertain significance');
      cy.get('[data-testid="CloseIcon"]').click();
      cy.get('.css-wwc21z > :nth-child(4) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
      cy.get('.css-wwc21z > :nth-child(3) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
      cy.get('.css-wwc21z > :nth-child(3) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Likely benign');
      cy.get('.css-wwc21z > :nth-child(3) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
      cy.get('.MuiLoadingButton-root').click();
      cy.get('td > .MuiTypography-root').should('have.text', 'No records to display');
      cy.get('.css-wwc21z > :nth-child(3) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
      cy.get('.css-wwc21z > :nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
      cy.get('.css-wwc21z > :nth-child(2) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Benign');
      cy.get('.css-wwc21z > :nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
      cy.get('.MuiLoadingButton-root').click();  
      cy.get('td > .MuiTypography-root').should('have.text', 'No records to display');
      cy.get('.css-wwc21z > :nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
      cy.get('.css-wwc21z > :nth-child(1) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
      cy.get('.css-wwc21z > :nth-child(1) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Not classified');
      cy.get('.css-wwc21z > :nth-child(1) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
      cy.get('.MuiLoadingButton-root').click();
      cy.get(':nth-child(1) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'KMT2C ');
      cy.get(':nth-child(1) > .css-1a60wmb > .css-1abzdwk > .css-l5c1s3 > .css-ly0uma > .MuiButtonBase-root > .MuiChip-label').click();
      cy.get('.MuiFormGroup-root > :nth-child(6) > .MuiTypography-root').should('have.text', 'Not classified');
      cy.get('[data-testid="CloseIcon"]').click();
      cy.get(':nth-child(2) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ZFHX3 ');
      cy.get(':nth-child(2) > .css-1a60wmb > .css-1abzdwk > .css-l5c1s3 > .css-ly0uma > .MuiButtonBase-root > .MuiChip-label').click();
      cy.get('.MuiFormGroup-root > :nth-child(6) > .MuiTypography-root').should('have.text', 'Not classified');
      cy.get('[data-testid="CloseIcon"]').click();
      cy.get('.MuiButton-outlined').click();
    })

    it('MER-T248: Somatic - Filtres - Recherche par Min. Somatic Score', () => {
      /* ==== STEP 2 ==== */
      cy.contains('Somatic', { matchCase: false }).click({ force: true });
      // cy.get('[href="/analyzes/11328/somatic"]').click({ force: true });
      cy.get('.css-djfak1 > .MuiTypography-root > span').should('have.text', 'caco2_CNV - PON_1000-N_C2_1000-T');
      cy.get('[href="/analyzes/11328/somatic"]').should('have.text', 'Somatic');
      /* ==== STEP 7 ==== */
      cy.contains('RESET FILTERS', { matchCase: false }).click({ force: true });
      cy.get('.css-ikzlcq > .css-13sljp9 > .MuiFormLabel-root').should('have.text', 'Min. somatic score');    
      cy.get('input[name="minSomaticScore"][type="number"]').clear();
      cy.get('input[name="minSomaticScore"][type="number"]').type('30');
      cy.get('.MuiLoadingButton-root').click();
      cy.get('input[name="minSomaticScore"][type="number"]').should('have.value', '30');
      cy.get('.MuiButton-outlined').click();
      /* ==== STEP 8 ==== */
      cy.contains('RESET FILTERS', { matchCase: false }).click({ force: true });
    })

    it.skip('MER-T248: Somatic - Filtres - Recherche par filtre favori', () => {
      /* ==== STEP 2 ==== */
      cy.contains('Somatic', { matchCase: false }).click({ force: true });
      // cy.get('[href="/analyzes/11328/somatic"]').click({ force: true });
      cy.get('.css-djfak1 > .MuiTypography-root > span').should('have.text', 'caco2_CNV - PON_1000-N_C2_1000-T');
      cy.get('[href="/analyzes/11328/somatic"]').should('have.text', 'Somatic');
      /* ==== STEP 9 ==== */
      //TODO: créer un filtre FILTRE 1 dans la future base de tests
      /* ==== STEP 10 ==== */
      cy.contains('RESET FILTERS', { matchCase: false }).click({ force: true });
      //TODO: sélectionner FILTRE 1 et vérifier que ces paramètres s'affichent
    })

    it('Should display the time load of the main homepage', () => {
      cy.displayTimeLoadOf()
    })
  })

  // TODO: Create favorite filter Test_Germline (Env Mercury dockerisé en attente) (STEPS 8 ET 9)
  describe('MER-T251 (1.0): Page variants germline - Filtres', () => {
    beforeEach(function () {
      onMercurySmokeTestsPage.givenWeAreOnTheLoginPage()
      /* ==== STEP 1 ==== */
      onMercurySmokeTestsPage.whenWeLoginToMercuryWithTheAccess('bioinf', 'bioinf')
      cy.viewport(1280, 720)
    })
    // Vérifier que toutes les infos de qualité et de couverture au niveau de chaque gène d'intérêt sont disponibles et intégrables au rapport
    // Uniquement pour les analyses de panels de gènes
    it('MER-T251-2: Should be on the analysis Germline page', function() {   
      /* ==== STEP 2 ==== */
      onMercuryValidationTestsPage.whenWeSelectAnalysis('FamLACDON0704')
      onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('FamLACDON0704')
      cy.contains('FamLACDON0704 - LACDON0704-CN_LACDON0704-CT_LACDON0704', { matchCase: false })
      cy.contains('Germline', { matchCase: false }).should('be.visible')
      cy.contains('Germline', { matchCase: false }).click({ force: true });
      onMercuryValidationTestsPage.thenWeAreOnGermlinePageOfAnalysis('FamLACDON0704 - LACDON0704-CN_LACDON0704-CT_LACDON0704');
    });

    it('MER-T251-3: Should be able to search by gene name', function() {   
      /* ==== STEP 3 ==== */
      onMercuryValidationTestsPage.whenWeSelectAnalysis('qualification2_duo_620')
      onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('qualification2_duo_620')
      cy.contains('qualification2_duo_620 - MR-CONSTIT-N_VEP101_MR-TUMOR-T1-ADN_VEP101', { matchCase: false })
      cy.contains('Germline', { matchCase: false }).should('be.visible').click({force: true})
      onMercuryValidationTestsPage.thenWeAreOnGermlinePageOfAnalysis('qualification2_duo_620 - MR-CONSTIT-N_VEP101_MR-TUMOR-T1-ADN_VEP101');
      cy.contains('RESET FILTERS', { matchCase: false }).click({ force: true });
      // Gene ERCC4
      onMercuryValidationTestsPage.whenWeSearchForGeneNames('ERCC4');
      onMercuryValidationTestsPage.thenWeShouldSeeTableGenesResults([
        'ERCC4',
      ])
      // Gene TAF15
      onMercuryValidationTestsPage.whenWeSearchForGeneNames('TAF15');
      onMercuryValidationTestsPage.thenWeShouldSeeTableGenesResults([
        'TAF15',
      ])
      // Gene TRRAP
      onMercuryValidationTestsPage.whenWeSearchForGeneNames('TRRAP');
      onMercuryValidationTestsPage.thenWeShouldSeeTableGenesResults([
        'TRRAP',
      ])
      // Gene in error
      onMercuryValidationTestsPage.whenWeSearchForGeneNames('ERROR_GENE_NAME');
      onMercuryValidationTestsPage.thenTheSearchButtonIsDisabled()
    });

    it('MER-T251-4: Should be able to apply filters on the Germline table', function() {   
      /* ==== STEP 4 ==== */
      onMercuryValidationTestsPage.whenWeSelectAnalysis('INT-30')
      onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('INT-30')
      cy.contains('INT-30 - OJ82_OJ83_OJ84', { matchCase: false })
      cy.contains('Germline', { matchCase: false }).should('be.visible').click({force: true})
      onMercuryValidationTestsPage.thenWeAreOnGermlinePageOfAnalysis('INT-30 - OJ82_OJ83_OJ84');
      cy.contains('RESET FILTERS', { matchCase: false }).click({ force: true });
      onMercuryValidationTestsPage.givenWeUncheckAllTheGermlineTheFilters()
      
      onMercuryValidationTestsPage.whenWeApplyGermlineFilter('Pathogenic')
      onMercuryValidationTestsPage.thenWeShouldSeeTableGermlineResults('Pathogenic', [
        '5',
      ])

      onMercuryValidationTestsPage.whenWeApplyGermlineFilter('Likely pathogenic')
      onMercuryValidationTestsPage.thenWeShouldSeeTableGermlineResults('Likely pathogenic', [
        'No records to display'
      ])

      onMercuryValidationTestsPage.whenWeApplyGermlineFilter('Unknown significance (VUS)')
      onMercuryValidationTestsPage.thenWeShouldSeeTableGermlineResults('Unknown significance (VUS)', [
        '3',
        '3',
        '3',
        '3',
        '3',
        '3',
        '3',
      ])

      onMercuryValidationTestsPage.whenWeApplyGermlineFilter('Likely benign')
      onMercuryValidationTestsPage.thenWeShouldSeeTableGermlineResults('Likely benign', [
        '2'
      ])

      onMercuryValidationTestsPage.whenWeApplyGermlineFilter('Benign')
      onMercuryValidationTestsPage.thenWeShouldSeeTableGermlineResults('Benign', [
        'No records to display'
      ])

      onMercuryValidationTestsPage.whenWeApplyGermlineFilter('Not classified')
      onMercuryValidationTestsPage.thenWeShouldSeeTableGermlineResults('Not classified', [
        '0',
        '0',
      ])
    });

    it('MER-T251-4-Bis: Should be able to apply filters on the Germline table (Likely Pathogenic and Benign)', function() {   
      /* ==== STEP 4 Bis ==== */
      onMercuryValidationTestsPage.whenWeSelectAnalysis('qualification3_duo_620')
      onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('qualification3_duo_620')
      cy.contains('qualification3_duo_620 - MAPCONSTIT-N_VEP101_MAPTUMOR-T1-ADN_VEP101', { matchCase: false })
      cy.contains('Germline', { matchCase: false }).should('be.visible').click({force: true})
      onMercuryValidationTestsPage.thenWeAreOnGermlinePageOfAnalysis('qualification3_duo_620 - MAPCONSTIT-N_VEP101_MAPTUMOR-T1-ADN_VEP101');
      cy.contains('RESET FILTERS', { matchCase: false }).click({ force: true });
      onMercuryValidationTestsPage.givenWeUncheckAllTheGermlineTheFilters()      
      onMercuryValidationTestsPage.whenWeApplyGermlineFilter('Likely pathogenic')
      onMercuryValidationTestsPage.thenWeShouldSeeTableGermlineResults('Likely pathogenic', [
        '4'
      ])
      onMercuryValidationTestsPage.whenWeApplyGermlineFilter('Benign')
      onMercuryValidationTestsPage.thenWeShouldSeeTableGermlineResults('Benign', [
        '1'
      ])
    });

    it('MER-T251-5-et-6: Should be able to apply Mutation enrichment on the germline page', function() {   
      /* ==== STEP 5 ==== */
      onMercuryValidationTestsPage.whenWeSelectAnalysis('qualification3_duo_620')
      onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('qualification3_duo_620')
      cy.contains('qualification3_duo_620 - MAPCONSTIT-N_VEP101_MAPTUMOR-T1-ADN_VEP101', { matchCase: false })
      cy.contains('Germline', { matchCase: false }).should('be.visible').click({force: true})
      onMercuryValidationTestsPage.thenWeAreOnGermlinePageOfAnalysis('qualification3_duo_620 - MAPCONSTIT-N_VEP101_MAPTUMOR-T1-ADN_VEP101');
      cy.contains('RESET FILTERS', { matchCase: false }).click({ force: true }); 
      onMercuryValidationTestsPage.whenWeCheckMutationEnrichment()
      onMercuryValidationTestsPage.thenWeDisplayField('Selection')
      onMercuryValidationTestsPage.andWeDisplayField('Max p-value')
      /* ==== STEP 6 ==== */
      onMercuryValidationTestsPage.whenWeSelectSelectionValue('Δ VAF between Tumor and constit')
      onMercuryValidationTestsPage.thenWeShouldDisplaySelectSelectionValue('Δ VAF between Tumor and constit')
      onMercuryValidationTestsPage.whenWeTypeMaxPValueOf('10')
      onMercuryValidationTestsPage.thenWeShouldDisplayMaxPValueOf('10')
    });

    it('MER-T251-7: Should be able to reset filters on the Germline page', function() {   
      /* ==== STEP 7 ==== */
      onMercuryValidationTestsPage.whenWeSelectAnalysis('qualification3_duo_620')
      onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('qualification3_duo_620')
      cy.contains('qualification3_duo_620 - MAPCONSTIT-N_VEP101_MAPTUMOR-T1-ADN_VEP101', { matchCase: false })
      cy.contains('Germline', { matchCase: false }).should('be.visible').click({force: true})
      onMercuryValidationTestsPage.thenWeAreOnGermlinePageOfAnalysis('qualification3_duo_620 - MAPCONSTIT-N_VEP101_MAPTUMOR-T1-ADN_VEP101');
      onMercuryValidationTestsPage.givenWeUncheckAllTheGermlineTheFilters() 
      onMercuryValidationTestsPage.thenWeShouldSeeGermlineFilter('Pathogenic', 'unchecked')
      onMercuryValidationTestsPage.thenWeShouldSeeGermlineFilter('Likely pathogenic', 'unchecked')
      onMercuryValidationTestsPage.thenWeShouldSeeGermlineFilter('Unknown significance (VUS)', 'unchecked')
      onMercuryValidationTestsPage.thenWeShouldSeeGermlineFilter('Likely benign', 'unchecked')
      onMercuryValidationTestsPage.thenWeShouldSeeGermlineFilter('Benign', 'unchecked')
      onMercuryValidationTestsPage.thenWeShouldSeeGermlineFilter('Not classified', 'unchecked')
      onMercuryValidationTestsPage.whenWeApplyTheseFilters()
      onMercuryValidationTestsPage.andWeResetFilters()
      onMercuryValidationTestsPage.thenWeShouldSeeGermlineFilter('Pathogenic', 'checked')
      onMercuryValidationTestsPage.thenWeShouldSeeGermlineFilter('Likely pathogenic', 'checked')
      onMercuryValidationTestsPage.thenWeShouldSeeGermlineFilter('Unknown significance (VUS)', 'checked')
      onMercuryValidationTestsPage.thenWeShouldSeeGermlineFilter('Likely benign', 'checked')
      onMercuryValidationTestsPage.thenWeShouldSeeGermlineFilter('Benign', 'checked')
      onMercuryValidationTestsPage.thenWeShouldSeeGermlineFilter('Not classified', 'checked')
    });

     
    it.skip('MER-T251-8: Should be able to create a favorite filter Test_Germline on the Germline page', function() {   
      /* ==== STEP 8 ==== */
      onMercuryValidationTestsPage.whenWeSelectAnalysis('qualification3_duo_620')
      onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('qualification3_duo_620')
      cy.contains('qualification3_duo_620 - MAPCONSTIT-N_VEP101_MAPTUMOR-T1-ADN_VEP101', { matchCase: false })
      cy.contains('Germline', { matchCase: false }).should('be.visible').click({force: true})
      onMercuryValidationTestsPage.thenWeAreOnGermlinePageOfAnalysis('qualification3_duo_620 - MAPCONSTIT-N_VEP101_MAPTUMOR-T1-ADN_VEP101');
      onMercuryValidationTestsPage.givenWeUncheckAllTheGermlineTheFilters() 
      onMercuryValidationTestsPage.thenWeShouldSeeGermlineFilter('Pathogenic', 'unchecked')
      onMercuryValidationTestsPage.thenWeShouldSeeGermlineFilter('Likely pathogenic', 'unchecked')
      onMercuryValidationTestsPage.thenWeShouldSeeGermlineFilter('Unknown significance (VUS)', 'unchecked')
      onMercuryValidationTestsPage.thenWeShouldSeeGermlineFilter('Likely benign', 'unchecked')
      onMercuryValidationTestsPage.thenWeShouldSeeGermlineFilter('Benign', 'unchecked')
      onMercuryValidationTestsPage.thenWeShouldSeeGermlineFilter('Not classified', 'unchecked')
    });

  
    it.skip('MER-T251-9: Should be able to apply a favorite filter Test_Germline on the Germline page', function() {   
      /* ==== STEP 9 ==== */
      onMercuryValidationTestsPage.whenWeSelectAnalysis('qualification3_duo_620')
      onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('qualification3_duo_620')
      cy.contains('qualification3_duo_620 - MAPCONSTIT-N_VEP101_MAPTUMOR-T1-ADN_VEP101', { matchCase: false })
      cy.contains('Germline', { matchCase: false }).should('be.visible').click({force: true})
      onMercuryValidationTestsPage.thenWeAreOnGermlinePageOfAnalysis('qualification3_duo_620 - MAPCONSTIT-N_VEP101_MAPTUMOR-T1-ADN_VEP101');
    });

    it('Should display the time load of the main homepage', () => {
      cy.displayTimeLoadOf()
    })
  })






  /*   
    DONE
  */

    describe.only('1-Mercury Login Page display', () => {

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
  
    })

    describe('MER-T153 (1.0): Filtre classification ACMG', () => {
  
      before(function () {
        onMercurySmokeTestsPage.givenWeAreOnTheLoginPage()
        onMercurySmokeTestsPage.whenWeLoginToMercuryWithTheAccess('bioinf', 'bioinf')
        cy.viewport(1280, 720)
      })
  
      it('MER-T153: Filtre classification ACMG', () => {  
        // ANO POUR QA: 5 niveaux de classif Gain, loss, etc... au lieu de 6
        /* ==== STEP 1 ==== */
        onMercuryValidationTestsPage.whenWeSelectAnalysis('PPD_KDM43795')
        onMercuryValidationTestsPage.andWeClickOnTopMenu('cnv')
        onMercuryValidationTestsPage.andWeSelectClassificationLevel('Loss')
        /* ==== STEP 2 ==== */
        onMercuryValidationTestsPage.thenWeShouldSeeTheTableWithCellsContent([
          'LOSS',
          'LOSS',
          'LOSS',
          'LOSS',
          'LOSS',
          'LOSS',
          'LOSS',
        ])
      })
  
      it('Should display the time load of the main homepage', () => {
        cy.displayTimeLoadOf()
      })
    })

    describe('MER-T154 (1.0): Login MERCURY', () => {

      before(function () {
        onMercurySmokeTestsPage.givenWeAreOnTheLoginPage()
        /* ==== STEP 1 ==== */
        onMercurySmokeTestsPage.whenWeLoginToMercuryWithTheAccess('bioinf', 'bioinf')
        cy.viewport(1280, 720)
      })
  
      it('MER-T154: Login MERCURY', () => {
        /* ==== STEP 2 ==== */
        onMercurySmokeTestsPage.andWeShouldSeeTheLogo('Mercury Logo')
        onMercurySmokeTestsPage.andWeShouldSeeTheTopSidebarMenu('Dashboard')
        onMercurySmokeTestsPage.andWeShouldSeeTheTopSidebarMenu('New Analysis')
        onMercurySmokeTestsPage.andWeShouldSeeTheTopTab('ANALYZES')
        onMercurySmokeTestsPage.andWeShouldSeeTheTopTab('BATCHES')
      })
  
      it('Should display the time load of the main homepage', () => {
        cy.displayTimeLoadOf()
      })
    })

    describe('MER-T156 (1.0): Test filtre 3Dhotspots', () => {

      beforeEach(function () {
        onMercurySmokeTestsPage.givenWeAreOnTheLoginPage()
        /* ==== STEP 1 ==== */
        onMercurySmokeTestsPage.whenWeLoginToMercuryWithTheAccess('bioinf', 'bioinf')
        cy.viewport(1280, 720)
      })
  
      it('MER-T156: Should be on Overview then on Somatic page of the analysis', () => {
        /* ==== STEP 2 ==== */
        onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV')
        cy.get('.css-djfak1 > .MuiTypography-root > span').should('have.text', 'caco2_CNV - PON_1000-N_C2_1000-T');
        cy.get('[style="transform: translate(308px, 1060px); width: 288px; height: 95px; position: absolute;"] > .MuiPaper-root > .css-ozvo54 > .css-8v90jo > .css-1ysvkas > [data-testid="LightbulbOutlinedIcon"]').should('be.visible');
        cy.get('[style="transform: translate(308px, 1060px); width: 288px; height: 95px; position: absolute;"] > .MuiPaper-root > .css-ozvo54 > .css-8v90jo > .css-hp68mp > .css-0 > .MuiTypography-overline').should('have.text', 'Qc Hotspots');
        /* ==== STEP 3 ==== */
        onMercuryValidationTestsPage.andWeClickOnTopMenu('somatic')
        cy.get('.MuiTypography-root > span').should('have.text', 'caco2_CNV - PON_1000-N_C2_1000-T');
      })

      it('MER-T156: Should see deselected somatic 3Dhotspots filter', () => {
        onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV')
        onMercuryValidationTestsPage.andWeClickOnTopMenu('somatic')
        /* ==== STEP 4 ==== */
        cy.contains('RESET FILTERS', { matchCase: false }).click({ force: true });
        cy.get('.MuiGrid-container > :nth-child(1) > :nth-child(1) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.MuiGrid-container > :nth-child(1) > :nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.css-1wxaqej > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.MuiGrid-container > :nth-child(2) > :nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.MuiGrid-container > :nth-child(2) > :nth-child(1) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.css-d0uhtl > :nth-child(1) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get(':nth-child(4) > .MuiFormControl-root > :nth-child(4) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.MuiFormControl-root > :nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.MuiFormControl-root > :nth-child(3) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get(':nth-child(5) > .MuiFormControl-root > :nth-child(4) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.MuiFormControl-root > :nth-child(5) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.css-wwc21z > :nth-child(4) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.css-wwc21z > :nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.css-wwc21z > :nth-child(5) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.css-wwc21z > :nth-child(6) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.css-wwc21z > :nth-child(1) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.css-wwc21z > :nth-child(3) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        // 3DHotspots filter selected
        cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiTypography-root > .css-vb6e92 > .css-ly0uma > .css-149340u').should('have.text', '3D Hotspots');
        cy.get('.css-d0uhtl > :nth-child(2) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get('.MuiLoadingButton-root').click();
        cy.get('.css-1yjo05o > .MuiTypography-root').should('have.text', 'SMAD4 ');
        cy.get('.css-8qp4i4 > :nth-child(1) > :nth-child(1) > .MuiChip-root > .MuiChip-label > [data-testid="LocalFireDepartmentIcon"]').should('be.visible');
        cy.get(':nth-child(2) > .css-ly0uma > .MuiChip-root > .MuiChip-label > [data-testid="AdjustIcon"]').should('be.visible');
        cy.get(':nth-child(2) > .css-ly0uma > .MuiChip-root > .MuiChip-label > [data-testid="AdjustIcon"]').should('have.attr', 'data-testid', 'AdjustIcon');
        cy.get(':nth-child(1) > :nth-child(2) > .MuiChip-root').click();
        cy.get(':nth-child(2) > .MuiChip-root > .MuiChip-label > .css-u4p24i > .MuiBox-root').should('be.visible');
        cy.get(':nth-child(2) > .MuiChip-root > .MuiChip-label > .css-u4p24i > [data-testid="LocalFireDepartmentIcon"]').should('have.attr', 'data-testid', 'LocalFireDepartmentIcon');
        cy.get('.css-1o1qjjc > .MuiPaper-root').click();
        // 3DHotspots filter deselected
        cy.get('.css-d0uhtl > :nth-child(2) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.css-d0uhtl > :nth-child(2) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').should('not.be.checked');
        cy.get('.css-d0uhtl > :nth-child(2) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').should('have.value', '3DHotspots');
        cy.get('.MuiLoadingButton-root').click();
        cy.get('td > .MuiTypography-root').should('be.visible');
        cy.get('td > .MuiTypography-root').should('have.text', 'No records to display');
        // Reset the filters
        cy.contains('RESET FILTERS', { matchCase: false }).click({ force: true });
      })

      it('MER-T156: Somatic - Filtres - Recherche par Type de mutations', () => { 
        onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV')
        onMercuryValidationTestsPage.andWeClickOnTopMenu('somatic')
        /* ==== STEP 5 ==== */
        cy.contains('RESET FILTERS', { matchCase: false }).click({ force: true });
        cy.get('.css-d0uhtl > :nth-child(1) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.css-d0uhtl > :nth-child(2) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.css-d0uhtl > :nth-child(1) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').should('not.be.checked');
        cy.get('.css-d0uhtl > :nth-child(2) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').should('not.be.checked');
        cy.get('.css-d0uhtl > :nth-child(1) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        cy.get('.css-amaadx > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').contains('SMAD4');
        cy.contains('Cancer hotspots');
        cy.get(':nth-child(4) > .MuiFormControl-root > :nth-child(4) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.MuiLoadingButton-root').click();
        cy.get('.css-d0uhtl > :nth-child(1) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.css-d0uhtl > :nth-child(2) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        cy.get('.MuiLoadingButton-root').click();
        cy.get('.css-1yjo05o > .MuiTypography-root').contains('SMAD4');
        cy.get(':nth-child(2) > .MuiChip-root > .MuiChip-label > .css-u4p24i > [data-testid="LocalFireDepartmentIcon"]').should('be.visible');
        cy.contains('3D Hotspots');
        cy.get('.css-d0uhtl > :nth-child(2) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get(':nth-child(4) > .MuiFormControl-root > :nth-child(4) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        cy.get('.css-1dmvi4v > :nth-child(1) > .MuiBox-root').should('have.text', 'SNV');
        cy.get('.css-1dmvi4v > :nth-child(2) > .MuiBox-root').should('have.text', 'MNV');
        cy.get('.css-1dmvi4v > :nth-child(3) > .MuiBox-root').should('have.text', 'Indel');
        cy.get('.MuiLoadingButton-root').click();
        cy.get(':nth-child(1) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').contains('APC');
        cy.get(':nth-child(1) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiChip-root > .MuiChip-label > [data-testid="AdjustIcon"] > path').should('be.visible');
        cy.get(':nth-child(1) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').contains('SNV');
        cy.get(':nth-child(3) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').contains('MGA');
        cy.get(':nth-child(3) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').contains('Deletion');
        cy.get('.MuiButton-outlined').click();
      })
  
      it('MER-T156: Somatic - Filtres - Recherche par Type CNV', () => {
        onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV')
        onMercuryValidationTestsPage.andWeClickOnTopMenu('somatic')
        /* ==== STEP 5 Bis ==== */
        cy.contains('RESET FILTERS', { matchCase: false }).click({ force: true });
        cy.get('.MuiFormControl-root > :nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        cy.get('.MuiFormControl-root > :nth-child(2) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Amplification');
        cy.get('.MuiFormControl-root > :nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get('.MuiLoadingButton-root').click();
        cy.get(':nth-child(4) > .MuiFormControl-root > :nth-child(4) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.css-d0uhtl > :nth-child(2) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.css-d0uhtl > :nth-child(1) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.MuiLoadingButton-root').click();
        cy.get(':nth-child(1) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ARFRP1 ');
        cy.get(':nth-child(1) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'Amplification');
        cy.get(':nth-child(2) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ASXL1 ');
        cy.get(':nth-child(2) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'Amplification');
        cy.get(':nth-child(3) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ASXL1 ');
        cy.get(':nth-child(3) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'Amplification');
        cy.get(':nth-child(4) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'AURKA ');
        cy.get(':nth-child(4) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'Amplification');
        cy.get(':nth-child(5) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'AURKA ');
        cy.get(':nth-child(5) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'Amplification');
        cy.get('.MuiFormControl-root > :nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.MuiFormControl-root > :nth-child(3) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        cy.get('.MuiFormControl-root > :nth-child(3) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Gain');
        cy.get('.MuiFormControl-root > :nth-child(3) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('have.value', 'Gain');
        cy.get('.MuiLoadingButton-root').click();
        cy.get(':nth-child(1) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ABI1 ');
        cy.get(':nth-child(1) > .css-1a0r1sq').click();
        cy.get(':nth-child(1) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'Gain');
        cy.get(':nth-child(2) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ABL1 ');
        cy.get(':nth-child(2) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'Gain');
        cy.get(':nth-child(3) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ACSL3 ');
        cy.get(':nth-child(3) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'Gain');
        cy.get('.MuiFormControl-root > :nth-child(3) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get(':nth-child(5) > .MuiFormControl-root > :nth-child(4) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        cy.get('.MuiFormControl-root > :nth-child(4) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Loss');
        cy.get(':nth-child(5) > .MuiFormControl-root > :nth-child(4) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get('.MuiLoadingButton-root').click();
        cy.get(':nth-child(1) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ABL2 ');
        cy.get(':nth-child(1) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'Loss');
        cy.get(':nth-child(2) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ADGRA2 ');
        cy.get(':nth-child(2) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'Loss');
        cy.get(':nth-child(3) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'AFF1 ');
        cy.get(':nth-child(3) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'Loss');
        cy.get('.MuiFormControl-root > :nth-child(5) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        cy.get(':nth-child(5) > .MuiFormControl-root > :nth-child(4) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.MuiFormControl-root > :nth-child(5) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Deletion');
        cy.get('.MuiFormControl-root > :nth-child(5) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.enabled');
        cy.get('.MuiLoadingButton-root').click();
        cy.get('.css-1yjo05o > .MuiTypography-root').should('have.text', 'PTPRD ');
        cy.get('.css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'Deletion');
        //Deletion
        cy.get('.MuiFormControl-root > :nth-child(5) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.MuiFormControl-root > :nth-child(6) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        cy.get('.MuiFormControl-root > :nth-child(6) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'cnLOH');
        cy.get('.MuiFormControl-root > :nth-child(6) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get('.MuiLoadingButton-root').click();
        cy.get(':nth-child(1) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ABL1 ');
        cy.get(':nth-child(1) > .css-1a0r1sq > .css-8qp4i4').click();
        cy.get(':nth-child(1) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'cnLOH');
        cy.get(':nth-child(2) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ABL2 ');
        cy.get(':nth-child(2) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'cnLOH');
        cy.get(':nth-child(3) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'AKT1 ');
        cy.get(':nth-child(3) > .css-1a0r1sq > .css-8qp4i4 > :nth-child(2) > .css-ly0uma > .MuiBox-root').should('have.text', 'cnLOH');
        cy.get('.MuiButton-outlined').click();
      })
  
      it('MER-T156: Somatic - Filtres - Recherche par ACMG Classification and reset filters', () => {
        onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV')
        onMercuryValidationTestsPage.andWeClickOnTopMenu('somatic')
        /* ==== STEP 5 ter ==== */
        cy.contains('RESET FILTERS', { matchCase: false }).click({ force: true });
        cy.get('.css-wwc21z > :nth-child(6) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.css-wwc21z > :nth-child(5) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.css-wwc21z > :nth-child(4) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.css-wwc21z > :nth-child(3) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.css-wwc21z > :nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.css-wwc21z > :nth-child(1) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.css-wwc21z > :nth-child(6) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Pathogenic');
        cy.get('.css-wwc21z > :nth-child(6) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        cy.get('.css-wwc21z > :nth-child(6) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get('.MuiLoadingButton-root').click();
        cy.get('.css-amaadx > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').contains('SMAD4');
        cy.get('.css-11c9j2a > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').contains('APC');
        cy.get('.css-amaadx > .css-1a60wmb > .css-1abzdwk > .css-l5c1s3 > .css-ly0uma > .MuiButtonBase-root > .MuiChip-label').click();
        cy.get('.MuiFormGroup-root > :nth-child(1) > .MuiTypography-root').should('have.text', 'Pathogenic');
        cy.get('[data-testid="CloseIcon"]').click();
        cy.get('.css-11c9j2a > .css-1a60wmb > .css-1abzdwk > .css-l5c1s3 > .css-ly0uma > .MuiButtonBase-root > .MuiChip-label').click();
        cy.get('.MuiFormGroup-root > :nth-child(1) > .MuiTypography-root').should('have.text', 'Pathogenic');
        cy.get('[data-testid="CloseIcon"]').click();
        cy.get('.css-wwc21z > :nth-child(5) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        cy.get('.css-wwc21z > :nth-child(6) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.css-wwc21z > :nth-child(5) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Likely pathogenic');
        cy.get('.css-wwc21z > :nth-child(5) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get('.MuiButton-startIcon > [data-testid="SearchIcon"]').click();   
        cy.get(':nth-child(1) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ERBB3 ');
        cy.get(':nth-child(1) > .css-1a60wmb > .css-1abzdwk > .css-l5c1s3 > .css-ly0uma > .MuiButtonBase-root > .MuiChip-label').click();
        cy.get('.MuiBox-root > .MuiFormControl-root > .MuiFormGroup-root > :nth-child(2) > .MuiTypography-root').should('have.text', 'Likely pathogenic');
        cy.get('[data-testid="CloseIcon"]').click();
        cy.get(':nth-child(2) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'MGA ');
        cy.get(':nth-child(2) > .css-1a60wmb > .css-1abzdwk > .css-l5c1s3 > .css-ly0uma > .MuiButtonBase-root > .MuiChip-label').click();
        cy.get('.MuiBox-root > .MuiFormControl-root > .MuiFormGroup-root > :nth-child(2) > .MuiTypography-root').should('have.text', 'Likely pathogenic');
        cy.get('[data-testid="CloseIcon"]').click();
        cy.get(':nth-child(3) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'TP53 ');
        cy.get(':nth-child(3) > .css-1a60wmb > .css-1abzdwk > .css-l5c1s3 > .css-ly0uma > .MuiButtonBase-root > .MuiChip-label').click();
        cy.get('.MuiBox-root > .MuiFormControl-root > .MuiFormGroup-root > :nth-child(2) > .MuiTypography-root').should('have.text', 'Likely pathogenic');
        cy.get('[data-testid="CloseIcon"]').click();
        cy.get('.css-wwc21z > :nth-child(5) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.css-wwc21z > :nth-child(4) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        cy.get('.css-wwc21z > :nth-child(4) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Unknown significance (VUS)');
        cy.get('.css-wwc21z > :nth-child(4) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get('.MuiLoadingButton-root').click();    
        cy.get(':nth-child(1) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ALK ');
        cy.get(':nth-child(1) > .css-1a60wmb > .css-1abzdwk > .css-l5c1s3 > .css-ly0uma > .MuiButtonBase-root > .MuiChip-label').click();
        cy.get('.MuiFormGroup-root > :nth-child(3) > .MuiTypography-root').should('have.text', 'Uncertain significance');
        cy.get('[data-testid="CloseIcon"]').click();
        cy.get(':nth-child(2) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'CTNNB1 ');
        cy.get(':nth-child(2) > .css-1a60wmb > .css-1abzdwk > .css-l5c1s3 > .css-ly0uma > .MuiButtonBase-root > .MuiChip-label').click();
        cy.get('.MuiFormGroup-root > :nth-child(3) > .MuiTypography-root').should('have.text', 'Uncertain significance');
        cy.get('[data-testid="CloseIcon"]').click();
        cy.get(':nth-child(3) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ERG ');
        cy.get(':nth-child(3) > .css-1a60wmb > .css-1abzdwk > .css-l5c1s3 > .css-ly0uma > .MuiButtonBase-root > .MuiChip-label').click();
        cy.get('.MuiFormGroup-root > :nth-child(3) > .MuiTypography-root').should('have.text', 'Uncertain significance');
        cy.get('[data-testid="CloseIcon"]').click();
        cy.get('.css-wwc21z > :nth-child(4) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.css-wwc21z > :nth-child(3) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        cy.get('.css-wwc21z > :nth-child(3) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Likely benign');
        cy.get('.css-wwc21z > :nth-child(3) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get('.MuiLoadingButton-root').click();
        cy.get('td > .MuiTypography-root').should('have.text', 'No records to display');
        cy.get('.css-wwc21z > :nth-child(3) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.css-wwc21z > :nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        cy.get('.css-wwc21z > :nth-child(2) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Benign');
        cy.get('.css-wwc21z > :nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get('.MuiLoadingButton-root').click();  
        cy.get('td > .MuiTypography-root').should('have.text', 'No records to display');
        cy.get('.css-wwc21z > :nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.css-wwc21z > :nth-child(1) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        cy.get('.css-wwc21z > :nth-child(1) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Not classified');
        cy.get('.css-wwc21z > :nth-child(1) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get('.MuiLoadingButton-root').click();
        cy.get(':nth-child(1) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'KMT2C ');
        cy.get(':nth-child(1) > .css-1a60wmb > .css-1abzdwk > .css-l5c1s3 > .css-ly0uma > .MuiButtonBase-root > .MuiChip-label').click();
        cy.get('.MuiFormGroup-root > :nth-child(6) > .MuiTypography-root').should('have.text', 'Not classified');
        cy.get('[data-testid="CloseIcon"]').click();
        cy.get(':nth-child(2) > .css-1s3ogw9 > .css-9jay18 > .css-1yjo05o > .MuiTypography-root').should('have.text', 'ZFHX3 ');
        cy.get(':nth-child(2) > .css-1a60wmb > .css-1abzdwk > .css-l5c1s3 > .css-ly0uma > .MuiButtonBase-root > .MuiChip-label').click();
        cy.get('.MuiFormGroup-root > :nth-child(6) > .MuiTypography-root').should('have.text', 'Not classified');
        cy.get('[data-testid="CloseIcon"]').click();
        cy.get('.MuiButton-outlined').click();
        /* ==== STEP 6 ==== */
        cy.contains('RESET FILTERS', { matchCase: false }).click({ force: true });
        cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-22 of 22 (from 28632 total entries)');
        cy.get(':nth-child(1) > :nth-child(1) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Tier 1 - Level A');
        cy.get('.MuiGrid-container > :nth-child(1) > :nth-child(1) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get('.MuiGrid-container > :nth-child(1) > :nth-child(2) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Tier 1 - Level B');
        cy.get('.MuiGrid-container > :nth-child(1) > :nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get('.css-1wxaqej > .MuiFormControlLabel-root > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'None');
        cy.get('.css-1wxaqej > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get('.MuiGrid-container > :nth-child(2) > :nth-child(1) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Tier 2 - Level c');
        cy.get('.MuiGrid-container > :nth-child(2) > :nth-child(1) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get('.MuiGrid-container > :nth-child(2) > :nth-child(2) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Tier 2 - Level D');
        cy.get('.MuiGrid-container > :nth-child(2) > :nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get('.css-d0uhtl > :nth-child(1) > .MuiFormControlLabel-root > .MuiTypography-root > .css-vb6e92 > .css-ly0uma > .MuiBox-root').should('have.text', 'Cancer hotspots');
        cy.get('.css-d0uhtl > :nth-child(1) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiTypography-root > .css-vb6e92 > .css-ly0uma > .css-149340u').should('have.text', '3D Hotspots');
        cy.get('.css-d0uhtl > :nth-child(2) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get(':nth-child(4) > .MuiTypography-root > .css-vb6e92 > .css-ly0uma > .MuiBox-root').should('have.text', 'Other');
        cy.get(':nth-child(4) > .MuiFormControl-root > :nth-child(4) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get('.MuiFormControl-root > :nth-child(2) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Amplification');
        cy.get('.MuiFormControl-root > :nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('not.be.checked');
        cy.get('.MuiFormControl-root > :nth-child(3) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Gain');
        cy.get('.MuiFormControl-root > :nth-child(3) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('not.be.checked');
        cy.get('.MuiFormControl-root > :nth-child(4) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Loss');
        cy.get(':nth-child(5) > .MuiFormControl-root > :nth-child(4) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('not.be.checked');
        cy.get('.MuiFormControl-root > :nth-child(5) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Deletion');
        cy.get('.MuiFormControl-root > :nth-child(5) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('not.be.checked');
        cy.get('.MuiFormControl-root > :nth-child(6) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'cnLOH');
        cy.get('.MuiFormControl-root > :nth-child(6) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('not.be.checked');
        cy.get('.css-wwc21z > :nth-child(6) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Pathogenic');
        cy.get('.css-wwc21z > :nth-child(6) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get('.css-wwc21z > :nth-child(5) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Likely pathogenic');
        cy.get('.css-wwc21z > :nth-child(5) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get('.css-wwc21z > :nth-child(4) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Unknown significance (VUS)');
        cy.get('.css-wwc21z > :nth-child(4) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get('.css-wwc21z > :nth-child(3) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Likely benign');
        cy.get('.css-wwc21z > :nth-child(3) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get('.css-wwc21z > :nth-child(2) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Benign');
        cy.get('.css-wwc21z > :nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get('.css-wwc21z > :nth-child(1) > .MuiTypography-root > .css-ly0uma > .MuiBox-root').should('have.text', 'Not classified');
        cy.get('.css-wwc21z > :nth-child(1) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
      })

      it('Should display the time load of the main homepage', () => {
        cy.displayTimeLoadOf()
      })
    })
  
    //TODO: REFACTO
    describe('MER-T165 (1.0): Gènes du cancer sur la page CNV', () => {
  
      before(function () {
        onMercurySmokeTestsPage.givenWeAreOnTheLoginPage()
        /* ==== STEP 1 ==== */
        onMercurySmokeTestsPage.whenWeLoginToMercuryWithTheAccess('bioinf', 'bioinf')
        cy.viewport(1280, 720)
      })
  
      it('MER-T165: Gènes du cancer sur la page CNV', () => {
        
        /* ==== STEP 2 ==== */
        onMercuryValidationTestsPage.andWeClickOnTopMenu('cnv')
        
        // cy.get('.MuiButton-root').click({force: true});
        // cy.get(':nth-child(2) > .css-ojvzib > .MuiTypography-root').click({force: true});
        // cy.get('[href="/analyzes/11490/cnv"]').click({force: true});
        // On doit avoir 2 gènes
        // cy.get(':nth-child(1) > .css-1xtpav9 > .MuiButtonBase-root > .MuiChip-label').should('contain', 2).click({force: true});
        // cy.contains('Genes in CNV', { matchCase: false })
        // // On obtient bien 2 gènes
        // cy.contains('ANHX', { matchCase: false })
        // cy.contains('ZNF268', { matchCase: false })
      })
  
      it('Should display the time load of the main homepage', () => {
        cy.displayTimeLoadOf()
      })
    })
  
    describe('MER-T166 (1.0): Gènes inclus dans le CNV sur la page CNV', () => {
  
      before(function () {
        onMercurySmokeTestsPage.givenWeAreOnTheLoginPage()
        cy.viewport(1280, 720)
      })
  
      it('MER-T166: Gènes inclus dans le CNV sur la page CNV', () => {
        onMercurySmokeTestsPage.whenWeFillInLoginFieldWith('bioinf')
        onMercurySmokeTestsPage.andWeFillInPasswordFieldWith('bioinf')
        onMercurySmokeTestsPage.andWeClickOnSubmitButton()
        onMercurySmokeTestsPage.thenWeShouldBeLoggedOnTheMainHomePageLocatedAtUrl('https://mercury-react-kqwuw7jkta-ew.a.run.app/')
        cy.get('.MuiButton-root').click({force: true});
        cy.get(':nth-child(2) > .css-ojvzib > .MuiTypography-root').click({force: true});
        cy.get('[href="/analyzes/11490/cnv"]').click({force: true});
        // On doit avoir 2 gènes
        //QA: id MER-T165 ? / genes in CNA or genes in CNV (MER-T166 STEP3)
        cy.get(':nth-child(1) > .css-1xtpav9 > .MuiButtonBase-root > .MuiChip-label').should('contain', 2).click({force: true});
        cy.contains('Genes in CNV', { matchCase: false })
        // On obtient bien 2 gènes
        cy.contains('ANHX', { matchCase: false })
        cy.contains('ZNF268', { matchCase: false })
      })
  
      it('Should display the time load of the main homepage', () => {
        cy.displayTimeLoadOf()
      })
    })

    describe('MER-T244 (1.0): QC Reporting', () => {

      beforeEach(function () {
        onMercurySmokeTestsPage.givenWeAreOnTheLoginPage()
        cy.viewport(1280, 720)
      })
  
      it('MER-T244: QC Reporting - B02-013-w3 analysis ', () => {
        /* ==== STEP 1 ==== */
        onMercurySmokeTestsPage.whenWeFillInLoginFieldWith('bioinf')
        onMercurySmokeTestsPage.andWeFillInPasswordFieldWith('bioinf')
        onMercurySmokeTestsPage.andWeClickOnSubmitButton()
        onMercurySmokeTestsPage.thenWeShouldBeLoggedOnTheMainHomePageLocatedAtUrl('https://mercury-react-kqwuw7jkta-ew.a.run.app/')
        cy.get('.MuiList-root > :nth-child(1)').should('have.text', 'Dashboard');
        cy.contains('Analyzes', { matchCase: false })
        cy.get('input[type="text"][placeholder="Search by analysis name, sequenceur, capture kit, batch name"]').clear();
        cy.get('input[type="text"][placeholder="Search by analysis name, sequenceur, capture kit, batch name"]').type(`B02-013-w3{enter}`, { force: true });
        // cy.get('#mui-14').click();
        cy.get('.css-ojvzib > .MuiTypography-root').should('have.text', 'B02-013');
        cy.get('.css-ojvzib > .MuiTypography-root').click();
        cy.get('.MuiTypography-root > span').should('have.text', 'B02-013 - PON_B02-013-w3');
        cy.get('.css-10mmbbb > :nth-child(1)').should('have.text', ' PIN: B02-013');
        /* ==== STEP 2 ==== */
        cy.get('.MuiListItemText-root > .MuiTypography-root').should('have.text', 'QC');
        cy.contains('QC', { matchCase: false }).click();
        // cy.get('.MuiListItemText-root > .MuiTypography-root').click();
        cy.get('.MuiList-root > [tabindex="0"]').should('have.text', 'QC Reporting');
        cy.get('.MuiList-root > [tabindex="0"]').click();
        cy.get('.MuiTypography-root > span').should('have.text', 'B02-013 - PON_B02-013-w3');
        /* ==== STEP 3 ==== */
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root').should('have.text', 'B02-013-w3');
        cy.get('.Mui-selected').should('have.text', 'Reporting Info');
        cy.get('.MuiTabs-flexContainer > :nth-child(2)').should('have.text', 'QC Sequencing');
        cy.get('.MuiTabs-flexContainer > :nth-child(3)').should('have.text', 'FastQC');
        cy.get('.MuiTabs-flexContainer > :nth-child(4)').should('have.text', 'Exome Positive Sample Tracking');
        cy.get('.MuiTabs-flexContainer > :nth-child(2)').click();
        cy.get('.MuiTabs-flexContainer > :nth-child(1)').click();
        cy.get('.Mui-selected').should('have.text', 'Reporting Info');
        cy.get(':nth-child(1) > .jss5 > .MuiTypography-root').should('have.text', 'Sample preparation');
        cy.get(':nth-child(1) > .jss5 > .css-1sf3xto > :nth-child(1) > .title').should('have.text', 'Organism');
        cy.get(':nth-child(1) > .jss5 > .css-1sf3xto > :nth-child(2) > .title').should('have.text', 'Library preparation kit');
        cy.get(':nth-child(1) > .jss5 > .css-1sf3xto > :nth-child(2) > :nth-child(2)').should('have.text', 'NEBNext Ultra II DNA Library Prep Kit for Illumina 2');
        cy.get(':nth-child(1) > .jss5 > .css-1sf3xto > :nth-child(3) > .title').should('have.text', 'Capture kit');
        cy.get(':nth-child(2) > .jss5 > .MuiTypography-root').should('have.text', 'Sequencing parameters');
        cy.get(':nth-child(2) > .jss5 > .css-1sf3xto > :nth-child(1) > .title').should('have.text', 'Sequencing platform');
        cy.get(':nth-child(2) > .jss5 > .css-1sf3xto > :nth-child(2) > .title').click();
        cy.get(':nth-child(2) > .jss5 > .css-1sf3xto > :nth-child(2) > .title').should('have.text', 'Flowcell ID');
        cy.get(':nth-child(2) > .jss5 > .css-1sf3xto > :nth-child(3) > .title').should('have.text', 'Control Software');
        cy.get(':nth-child(2) > .jss5 > .css-1sf3xto > :nth-child(4)').click();
        cy.get(':nth-child(2) > .jss5 > .css-1sf3xto > :nth-child(4) > .title').should('have.text', 'Primary analysis RTA');
        cy.get(':nth-child(5) > .title').should('have.text', 'Type of sequencing');
        cy.get(':nth-child(6) > .title').click();
        cy.get(':nth-child(6) > .title').should('have.text', 'Index size');
        cy.get(':nth-child(3) > .jss5 > .MuiTypography-root').should('have.text', 'Analysis parameters');
        cy.get(':nth-child(3) > .jss5 > .css-1sf3xto > :nth-child(1) > .title').should('have.text', 'Mismatches');
        cy.get(':nth-child(3) > .jss5 > .css-1sf3xto > :nth-child(2) > .title').should('have.text', 'With failed reads');
        cy.get(':nth-child(3) > .jss5 > .css-1sf3xto > :nth-child(3) > .title').should('have.text', 'Adapter sequence');
        cy.get(':nth-child(3) > .jss5 > .css-1sf3xto > :nth-child(4) > .title').should('have.text', 'Bioinformatic analysis');
        cy.get('.MuiTabs-flexContainer > :nth-child(2)').should('have.text', 'QC Sequencing');
        /* ==== STEP 4 ==== */
        cy.get('.MuiTabs-flexContainer > :nth-child(2)').click();
        cy.get('.css-167fwzb > :nth-child(1)').should('have.text', 'Exome general sequencing data quality');
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(1)').should('have.text', 'Sample');
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(2)').should('have.text', 'Mean_Depth_Obs');
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(3)').should('have.text', '%Align');
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(4)').should('have.text', 'Coverage_above_25X');
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(5)').should('have.text', 'MM_Read1');
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(6)').should('have.text', 'MM_Read2');
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(7)').should('have.text', 'Yield_Gb');
        cy.get('.MuiTableHead-root > .MuiTableRow-root > :nth-child(8)').should('have.text', 'Yield_Clusters');
        cy.get(':nth-child(3) > .MuiTypography-root').should('have.text', 'Graphical representation of quality status');
        cy.get('.MuiTabs-flexContainer > :nth-child(3)').should('have.text', 'FastQC');
        /* ==== STEP 5 ==== */
        cy.get('.MuiTabs-flexContainer > :nth-child(3)').click();
        cy.get('.css-i1r5v > .MuiGrid-container > :nth-child(1) > .MuiBox-root').should('be.visible');
        cy.get('.MuiGrid-container > :nth-child(2) > .MuiBox-root').should('be.visible');
        cy.get('.MuiGrid-container > :nth-child(3) > .MuiBox-root').should('be.visible');
        cy.get(':nth-child(4) > .MuiBox-root').should('be.visible');
        cy.get(':nth-child(5) > .MuiBox-root').should('be.visible');
        cy.get(':nth-child(6) > .MuiBox-root').should('be.visible');
        cy.get(':nth-child(7) > .MuiBox-root').should('be.visible');
        cy.get(':nth-child(8) > .MuiBox-root').should('be.visible');
        cy.get('.MuiTabs-flexContainer > :nth-child(4)').should('be.visible');
        /* ==== STEP 6 ==== */
        cy.get('.MuiTabs-flexContainer > :nth-child(4)').click();
  
        cy.get('.MuiBox-root > p').should(
            'have.text',
            'The Advanta™ Sample ID Genotyping Panel is a 96-SNP assay enabling laboratories to generate a sample-specific genetic fingerprint in order to confirm the identity between the results delivered and the DNA sample received. This genetic fingerprint includes 10 quality assessment SNPs, 6 gender SNPs, 80 exonic SNPs. At the end of the bioinformatics process, the genotyping results of the DNA sample received are compared against the sequencing data and a concordance score is calculated. This enables detection of failures in the sample preparation process (contamination, sample inversion, etc.) and ensures the concordance between the samples received and the results delivered'
        );
        /* ==== STEP 8 ==== */
        cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root').should('have.text', 'Variants Stats');
        cy.contains('General', { matchCase: false })
        cy.get('.highcharts-root > .highcharts-background').parent().should('be.visible');
        cy.contains('Germline', { matchCase: false })
        cy.get('.highcharts-root > .highcharts-background').parent().should('be.visible');
        cy.contains('Somatic', { matchCase: false })
        cy.get('.highcharts-root > .highcharts-background').parent().should('be.visible');
        cy.get(':nth-child(2) > .MuiPaper-root > .MuiCardHeader-root > .MuiCardHeader-action > .MuiButtonBase-root > [data-testid="ExpandLessIcon"]').click();
      })
  
      //Cas analysis avec une zone "Concordance Validation" (Step 8)
      it('MER-T244: QC Reporting - NQ_MAP338-N analysis ', () => {
        /* ==== STEP 1 ==== */
        onMercurySmokeTestsPage.whenWeFillInLoginFieldWith('bioinf')
        onMercurySmokeTestsPage.andWeFillInPasswordFieldWith('bioinf')
        onMercurySmokeTestsPage.andWeClickOnSubmitButton()
        onMercurySmokeTestsPage.thenWeShouldBeLoggedOnTheMainHomePageLocatedAtUrl('https://mercury-react-kqwuw7jkta-ew.a.run.app/')
        cy.get('.MuiList-root > :nth-child(1)').should('have.text', 'Dashboard');
        cy.contains('Analyzes', { matchCase: false })
        cy.get('input[type="text"][placeholder="Search by analysis name, sequenceur, capture kit, batch name"]').clear();
        cy.get('input[type="text"][placeholder="Search by analysis name, sequenceur, capture kit, batch name"]').type(`NOVASEQ_MAP338{enter}`, { force: true });
        cy.contains('NOVASEQ_MAP338', { matchCase: false }).click();
        // cy.get('.css-ojvzib > .MuiTypography-root').should('have.text', 'NOVASEQ_MAP338_75NOVASEQ_MAP338');
        // cy.get('.css-ojvzib > .MuiTypography-root').click();
        cy.get('.MuiTypography-root > span').should('have.text', 'NOVASEQ_MAP338_75 - NQ_MAP338-N_75_NQ_MAP338-T1-ADN_75_NQ_MAP338-T1-ARN_75');
        cy.get('.css-10mmbbb > :nth-child(1)').should('have.text', ' PIN: NOVASEQ_MAP338_75');
        /* ==== STEP 2 ==== */
        cy.get('.MuiListItemText-root > .MuiTypography-root').should('have.text', 'QC');
        cy.contains('QC', { matchCase: false }).click();
        // cy.get('.MuiListItemText-root > .MuiTypography-root').click();
        cy.get('.MuiList-root > [tabindex="0"]').should('have.text', 'QC Reporting');
        cy.get('.MuiList-root > [tabindex="0"]').click();
        cy.contains('NOVASEQ_MAP338_75 - NQ_MAP338-N_75_NQ_MAP338-T1-ADN_75_NQ_MAP338-T1-ARN_75', { matchCase: false }).click();
        cy.contains('NQ_MAP338-T1-ADN', { matchCase: false }).click();
        cy.contains('NQ_MAP338-T1-ARN', { matchCase: false }).click();
        cy.contains('NQ_MAP338-N', { matchCase: false }).click();
        cy.contains('Variants Stats', { matchCase: false }).click();
        cy.contains('Concordance Validation', { matchCase: false });
        /* ==== STEP 8 ==== */
        cy.get(':nth-child(5) > .MuiPaper-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root').should('be.visible');
        cy.get(':nth-child(5) > .MuiPaper-root > .MuiCardHeader-root > .MuiCardHeader-content > .MuiTypography-root').should('have.text', 'Concordance Validation');
        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1)').should('have.text', 'concordance N/T (all variants)');
        cy.get('.MuiTableBody-root > :nth-child(2) > :nth-child(1)').should('have.text', 'concordance N/T (43 markers)');
        cy.get('.MuiTableBody-root > :nth-child(3) > :nth-child(1)').click();
        cy.get('.MuiTableBody-root > :nth-child(3) > :nth-child(1)').should('have.text', 'concordance RNA/DNA (all variants)');
      })
  
      it('Should display the time load of the main homepage', () => {
        cy.displayTimeLoadOf()
      })
    })

    describe('MER-T246 (1.0): QC Hotspots', () => {
      beforeEach(function () {
        onMercurySmokeTestsPage.givenWeAreOnTheLoginPage()
        /* ==== STEP 1 ==== */
        onMercurySmokeTestsPage.whenWeLoginToMercuryWithTheAccess('bioinf', 'bioinf')
        cy.viewport(1280, 720)
      })
      // Vérifier que toutes les infos de qualité et de couverture au niveau de chaque gène d'intérêt sont disponibles et intégrables au rapport
      // Uniquement pour les analyses de panels de gènes
      it('MER-T246-2-et-3: Should be on the analysis QC Hotspots page via QC Hotspots box', function() {   
        /* ==== STEP 2 et 3 ==== */
        onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV')
        onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('caco2_CN')
        cy.contains('caco2_CNV - PON_1000-N_C2_1000-T', { matchCase: false })
        cy.contains('QC Hotspots', { matchCase: false }).should('be.visible')
        cy.contains('QC Hotspots', { matchCase: false }).click({ force: true });
        onMercuryValidationTestsPage.thenWeAreOnQCHotspotsPage('caco2_CNV - PON_1000-N_C2_1000-T');
      });
  
      it('MER-T246-2-et-3-Bis: Should be on the analysis QC Hotspots page via QC Hotspots menu', function() {   
        /* ==== STEP 3 Bis ==== */
        onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV');
        onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('caco2_CN');
        cy.contains('caco2_CNV - PON_1000-N_C2_1000-T', { matchCase: false });
        onMercuryValidationTestsPage.whenWeClickOnQCTopMenu('QC Hotspots');
        onMercuryValidationTestsPage.thenWeAreOnQCHotspotsPage('caco2_CNV - PON_1000-N_C2_1000-T');
      });
  
      it('MER-T246-4-et-5: Should check the analysis QC Hotspots informations on QC Hotspots menu', function() {   
        /* ==== STEP 4 ==== */
        onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV');
        onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('caco2_CNV - PON_1000-N_C2_1000-T');
        cy.contains('View filters', { matchCase: false });
        cy.get('[style="transform: translate(308px, 1060px); width: 288px; height: 95px; position: absolute;"] > .MuiPaper-root > .css-ozvo54 > .css-8v90jo > .css-hp68mp > .css-0 > .MuiTypography-h6').should('have.text', '257');
        // Ckeck infos de View Filters du carreau QC Hotspots
        cy.get('[style="transform: translate(308px, 1060px); width: 288px; height: 95px; position: absolute;"] > .MuiPaper-root > .css-ozvo54 > .css-8v90jo > .css-hp68mp > .css-hpwgno > .MuiButton-root > .MuiTypography-root').should('have.text', 'View filters ');
        cy.get('[style="transform: translate(308px, 1060px); width: 288px; height: 95px; position: absolute;"] > .MuiPaper-root > .css-ozvo54 > .css-8v90jo > .css-hp68mp > .css-hpwgno > .MuiButton-root > .MuiTypography-root').click();
        cy.get('.MuiPaper-elevation3 > .MuiTypography-root').should('have.text', 'Qc Hotspots filters');
        cy.get('h2').should('have.text', 'Normal filters');
        cy.get(':nth-child(1) > .MuiPaper-root > h3').should('have.text', 'Gene names');
        cy.get('.MuiGrid-container > :nth-child(1) > .MuiPaper-root > .MuiBox-root').should('have.text', 'No data');
        cy.get(':nth-child(2) > .MuiPaper-root > h3').should('have.text', 'Coverage quality');
        cy.get(':nth-child(2) > .MuiPaper-root > .MuiBox-root > ul > :nth-child(1)').should('have.text', 'PASS');
        cy.get(':nth-child(2) > .MuiPaper-root > .MuiBox-root > ul > :nth-child(2)').should('have.text', 'Low coverage');
        cy.get('.MuiPaper-root > .MuiBox-root > ul > :nth-child(3)').should('have.text', 'FAILED');
        cy.get(':nth-child(3) > .MuiPaper-root > h3').should('have.text', 'Mutations');
        cy.get(':nth-child(3) > .MuiPaper-root > .MuiBox-root > ul > :nth-child(1)').should('have.text', 'Not Mutated FILTERED');
        cy.get(':nth-child(3) > .MuiPaper-root > .MuiBox-root > ul > :nth-child(2)').should('have.text', 'Not covered');
        cy.get(':nth-child(4) > .MuiPaper-root > h3').should('have.text', 'Variant names');
        cy.get('.MuiGrid-container > :nth-child(4) > .MuiPaper-root > .MuiBox-root').should('have.text', 'No data').type('{esc}');
        /* ==== STEP 5 ==== */
        // Clique sur le carreau QC Hotspots
        // Filters : les hotspots comptés sont ceux annotés "somatic uncertain" et "not covered"
        cy.get('[style="transform: translate(308px, 1060px); width: 288px; height: 95px; position: absolute;"] > .MuiPaper-root > .css-ozvo54 > .css-8v90jo > .css-hp68mp > .css-0 > .MuiTypography-h6').click();
        cy.get(':nth-child(1) > .MuiFormGroup-root > .css-1iep9ha > :nth-child(3) > .MuiTypography-root > .MuiChip-root > .MuiChip-label').should('have.text', 'Somatic Uncertain');
        cy.get(':nth-child(1) > .MuiFormGroup-root > .css-1iep9ha > :nth-child(3) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get(':nth-child(5) > .MuiTypography-root > .MuiChip-root > .MuiChip-label').should('have.text', 'Not Covered');
        cy.get(':nth-child(5) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        // Le nombre affiché correspond au nombre de hotspots avec ces annotations (lorsque les seuils de couverture et de qualité ne sont pas atteints).
        cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-50 of 257 (from 3193 total entries)');
      });
  
      it('MER-T246-6: Should check columns of the analysis QC Hotspots informations table on QC Hotspots menu', function() {   
        /* ==== STEP 6 ==== */
        onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV');
        onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('caco2_CNV - PON_1000-N_C2_1000-T');
        cy.contains('QC Hotspots', { matchCase: false }).click({ force: true });
        onMercuryValidationTestsPage.thenWeAreOnQCHotspotsPage('caco2_CNV - PON_1000-N_C2_1000-T');
        cy.checkQCHotspotsTableColumnsLabel([
          'Gene',
          'HGVSc',
          'HGVSp',
          'Global',
          'Coverage',
          'Status',
          'Score IG',
          'QScore N',
          'QScore T',
          'Mean Depth',
          'VAF',
          'Comment Global Quality',
          'Browser',
          'Report'
        ])
        cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-50 of 257 (from 3193 total entries)');
      });
  
      it('MER-T246-7: Should be able to add a comment in the QC Hotspots table menu', function() {   
        /* ==== STEP 7 ==== */
        onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV');
        onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('caco2_CNV - PON_1000-N_C2_1000-T');
        cy.contains('QC Hotspots', { matchCase: false }).click({ force: true });
        // Reset commentaire et cochage "bouton rapport"
        cy.get('textarea[name="variantNames"]').should('be.visible').clear().type('c.714G>A');
        cy.get('.MuiButton-startIcon > [data-testid="SearchIcon"]').click();
        cy.get('textarea[name="variantNames"]').should('be.visible').clear();
        cy.get('.MuiButton-startIcon > [data-testid="SearchIcon"]').click();
        cy.get('.css-1yjo05o > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        // Vérifier qu'on peut ajouter un commentaire (ex: variant c.714G>A)
        cy.get('textarea[name="variantNames"]').should('be.visible').type('c.714G>A');
        cy.get('.MuiButton-startIcon > [data-testid="SearchIcon"]').click();
        cy.get('[data-testid="CommentIcon"] > path').should('be.visible');
        cy.get('[data-testid="CommentIcon"] > path').click();
        cy.get('textarea[name="comment"]').should('be.visible').clear().type('Test Cypress.');
        cy.contains('SAVE', { matchCase: false }).click({ force: true });
        // Cocher la case pour ajouter le variant au rapport
        cy.get('.css-1yjo05o > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        cy.get('.css-1yjo05o > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get('.css-1yjo05o > .MuiCheckbox-root > .PrivateSwitchBase-input').should('have.value', 'on');
        cy.get('.MuiButton-outlined').should('have.text', 'Reset filters');
        cy.get('.MuiAvatar-root').click();
        cy.get(':nth-child(9) > .MuiListItemText-root > .MuiTypography-root').should('have.text', 'Logout');
        cy.get(':nth-child(9) > .MuiListItemText-root > .MuiTypography-root').click();
        onMercurySmokeTestsPage.whenWeLoginToMercuryWithTheAccess('bioinf', 'bioinf')
        onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV');
        onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('caco2_CNV - PON_1000-N_C2_1000-T');
        cy.contains('QC Hotspots', { matchCase: false }).click({ force: true });
        cy.get('textarea[name="variantNames"]').should('be.visible').type('c.714G>A');
        cy.get('.MuiLoadingButton-root').click();
        cy.get('.css-u467it > .MuiTypography-root').should('have.text', 'c.714G>A');
        cy.get('[data-testid="CommentIcon"]').should('be.visible');
        cy.get('[data-testid="CommentIcon"]').click();
        cy.get('.MuiPaper-root > .MuiTypography-root').should('have.text', 'Comment');
        cy.get('#mui-300').should('have.value', 'Test Cypress.');
        cy.get('.MuiBox-root > .MuiLoadingButton-root').click();
        cy.get('.css-1yjo05o > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get('.css-1yjo05o > .MuiCheckbox-root > .PrivateSwitchBase-input').should('have.value', 'on');
      });
  
      it('MER-T246-8: Should be able sort columns in the QC Hotspots table', function() {   
        /* ==== STEP 8 ==== */
        onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV');
        onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('caco2_CNV - PON_1000-N_C2_1000-T');
        cy.contains('QC Hotspots', { matchCase: false }).click({ force: true });
        // Tri par gène
        cy.get('.css-1goqyuw > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').contains('Gene');
        // Tri des gènes par ordre croissant
        cy.get('.css-1goqyuw > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]').click();
        cy.get('.css-1goqyuw > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]').click();
        cy.get('.css-1goqyuw > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]').click();
        cy.mercuryCheckSortedColumns('Gene', [
          'CIC',
          'CIC',
          'CIC',
          'CIC',
          'CIC',
          'CIC',
          'CIC'
        ]) 
        // Tri des gènes par ordre décroissant
        cy.get('.css-1goqyuw > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]').click();
        cy.get('.css-1goqyuw > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]').click();
        cy.mercuryCheckSortedColumns('Gene', [
          'U2AF1',
          'U2AF1',
          'U2AF1',
          'U2AF1',
          'U2AF1',
          'U2AF1',
          'U2AF1'
        ])
        cy.get('.css-1goqyuw > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]').click();
        cy.get('.css-1goqyuw > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]').click();
        cy.get('.css-1goqyuw > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]').click();
  
        // Tri par Global
        cy.get('.css-f1lpyu > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').click();
        cy.get('.css-hlxl1d > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').should('have.text', 'Global');
        cy.get('.css-hlxl1d > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]').click();
        cy.mercuryCheckSortedColumns('Global', [
          'FAILED',
          'FAILED',
          'FAILED',
          'FAILED',
          'FAILED',
          'FAILED',
          'FAILED',
        ])
        cy.get('.css-hlxl1d > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]').click();
        cy.mercuryCheckSortedColumns('Global', [
          'FILTERED',
          'FILTERED',
          'FAILED',
          'FAILED',
          'FAILED',
          'FAILED',
          'FAILED',
          'FAILED',
        ])
        cy.get('.css-hlxl1d > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]').click();
  
        // Tri par Coverage
        cy.get('.css-62qajy > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').should('have.text', 'Coverage');
        cy.get('.css-62qajy > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]').click();
        cy.get('.css-62qajy > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]').click();
        cy.get('.css-62qajy > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]').click();
        cy.mercuryCheckSortedColumns('Coverage', [
          'FAILED',
          'FAILED',
          'FAILED',
          'FAILED',
          'FAILED',
          'FAILED',
          'FAILED',
          'FAILED',
        ])
        cy.get('.css-62qajy > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"] > path').click();
        cy.get('.css-62qajy > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"] > path').click();
        cy.mercuryCheckSortedColumns('Coverage', [
          'PASS',
          'PASS',
          'FAILED',
          'FAILED',
          'FAILED',
          'FAILED',
          'FAILED',
          'FAILED',
        ])
        // cy.get('.css-62qajy > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"] > path').click();
        cy.get('.css-62qajy > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]').click();
        cy.get('.css-62qajy > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]').click();
        cy.get('.css-62qajy > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]').click();
  
        
        // Tri par status
        cy.get('.css-zl3s1k > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').should('have.text', 'Status');
        cy.get('.css-zl3s1k > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root').click();
        cy.get('.css-zl3s1k > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root').click();
        cy.get('.css-zl3s1k > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root').click();
        cy.mercuryCheckSortedColumns('Status', [
          'Not covered',
          'Not covered',
          'Not covered',
          'Not covered',
          'Not covered',
          'Not covered',
          'Not covered',
        ])
        cy.get('.css-zl3s1k > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"] > path').click();
        cy.mercuryCheckSortedColumns('Status', [
          'Not Mutated',
          'Not covered',
          'Not covered',
          'Not covered',
          'Not covered',
          'Not covered',
          'Not covered',
        ])
        cy.get('.css-zl3s1k > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root').click();
        cy.get('.css-zl3s1k > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root').click();
        cy.get('.css-zl3s1k > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root').click();
      });
  
      it('MER-T246-9: Should be able to modify num entries in the QC Hotspots table', function() {   
        /* ==== STEP 9 ==== */
        onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV');
        onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('caco2_CNV - PON_1000-N_C2_1000-T');
        cy.contains('QC Hotspots', { matchCase: false }).click({ force: true });
        //10
        cy.contains('Rows per page')
          .parent()
          .find('div[role="button"]')
         .click()
       cy.get('li[data-value="10"]').should('be.visible').click();
       cy.get('tbody tr').should('have.length', 10)
       cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-10 of 257 (from 3193 total entries)');
       //25
       cy.contains('Rows per page')
         .parent()
         .find('div[role="button"]')
         .click()
       cy.get('li[data-value="25"]').should('be.visible').click();
       cy.get('tbody tr').should('have.length', 25)
       cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-25 of 257 (from 3193 total entries)');
       //50
       cy.contains('Rows per page')
         .parent()
         .find('div[role="button"]')
         .click()
       cy.get('li[data-value="50"]').should('be.visible').click();
       cy.get('tbody tr').should('have.length', 50)
       cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-50 of 257 (from 3193 total entries)');
       //100
       cy.contains('Rows per page')
         .parent()
         .find('div[role="button"]')
         .click()
       cy.get('li[data-value="100"]').should('be.visible').click();
       cy.get('tbody tr').should('have.length', 100)
       cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-100 of 257 (from 3193 total entries)');
        
      });
  
      it('MER-T246-10: Should be able to browse page by page in the QC Hotspots table', function() {   
        /* ==== STEP 10 ==== */
        onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV');
        onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('caco2_CNV - PON_1000-N_C2_1000-T');
        cy.contains('QC Hotspots', { matchCase: false }).click({ force: true });
        cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-50 of 257 (from 3193 total entries)');
        cy.get('[data-testid="KeyboardArrowRightIcon"]').click();
        cy.get('[data-testid="KeyboardArrowRightIcon"]').click();
        cy.get('[data-testid="KeyboardArrowRightIcon"]').click();
        cy.get('[data-testid="KeyboardArrowRightIcon"]').click();
        cy.get('[data-testid="KeyboardArrowRightIcon"]').click();
        cy.get('.MuiTablePagination-displayedRows').should('have.text', '251-257 of 257 (from 3193 total entries)');
        cy.get('[data-testid="FirstPageIcon"]').click();
        cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-50 of 257 (from 3193 total entries)');
        cy.get('[data-testid="LastPageIcon"]').click();
        cy.get('.MuiTablePagination-displayedRows').should('have.text', '251-257 of 257 (from 3193 total entries)');
        cy.get('[data-testid="FirstPageIcon"] > path').click();
        cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-50 of 257 (from 3193 total entries)'); 
      });
  
      it('MER-T246-11: Should be able to Show/Hide/Pin/Unpin the columns of the QC Hotspots table', function() {   
        /* ==== STEP 11 ==== */
        onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV');
        onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('caco2_CNV - PON_1000-N_C2_1000-T');
        cy.contains('QC Hotspots', { matchCase: false }).click({ force: true });
        // Hide/Pin/Unpin/Show column by column
        // Gene
        onMercuryValidationTestsPage.whenWeHideTableColumn('Gene')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns(['Gene'])
        onMercuryValidationTestsPage.whenWeShowTheTableColumn('Gene')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns(['Gene'])
        onMercuryValidationTestsPage.whenWeUnpinTheTableColumn('Gene')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns(['Gene'])
        // Variant
        onMercuryValidationTestsPage.whenWeHideTableColumn('Variant')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
          'HGVSc',
          'HGVSp'
        ])
        onMercuryValidationTestsPage.whenWeShowTheTableColumn('Variant')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
          'HGVSc',
          'HGVSp'
        ])
        onMercuryValidationTestsPage.whenWePinTheTableColumn('Variant')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
          'HGVSc',
          'HGVSp'
        ])
        onMercuryValidationTestsPage.whenWeUnpinTheTableColumn('Variant')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
          'HGVSc',
          'HGVSp'
        ])
        // Quality
        onMercuryValidationTestsPage.whenWeHideTableColumn('Quality')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
          'Global',
          'Coverage'
        ])
        onMercuryValidationTestsPage.whenWeShowTheTableColumn('Quality')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
          'Global',
          'Coverage'
        ])
        onMercuryValidationTestsPage.whenWePinTheTableColumn('Quality')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
          'Global',
          'Coverage'
        ])
        onMercuryValidationTestsPage.whenWeUnpinTheTableColumn('Quality')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
          'Global',
          'Coverage'
        ])
        // Status
        onMercuryValidationTestsPage.whenWeHideTableColumn('Status')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
          'Status'
        ])
        onMercuryValidationTestsPage.whenWeShowTheTableColumn('Status')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
          'Status'
        ])
        onMercuryValidationTestsPage.whenWePinTheTableColumn('Status')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
          'Status'
        ])
        onMercuryValidationTestsPage.whenWeUnpinTheTableColumn('Status')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
          'Status'
        ])
        // Score IG
        onMercuryValidationTestsPage.whenWeHideTableColumn('Score IG')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
          'Score IG'
        ])
        onMercuryValidationTestsPage.whenWeShowTheTableColumn('Score IG')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
          'Score IG'
        ])
        onMercuryValidationTestsPage.whenWePinTheTableColumn('Score IG')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
          'Score IG'
        ])
        onMercuryValidationTestsPage.whenWeUnpinTheTableColumn('Score IG')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
          'Score IG'
        ])
        // QScore N
        onMercuryValidationTestsPage.whenWeHideTableColumn('QScore N')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
          'QScore N'
        ])
        onMercuryValidationTestsPage.whenWeShowTheTableColumn('QScore N')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
          'QScore N'
        ])
        onMercuryValidationTestsPage.whenWePinTheTableColumn('QScore N')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
          'QScore N'
        ])
        onMercuryValidationTestsPage.whenWeUnpinTheTableColumn('QScore N')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
          'QScore N'
        ])
        // QScore T
        onMercuryValidationTestsPage.whenWeHideTableColumn('QScore T')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
          'QScore T'
        ])
        onMercuryValidationTestsPage.whenWeShowTheTableColumn('QScore T')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
          'QScore T'
        ])
        onMercuryValidationTestsPage.whenWePinTheTableColumn('QScore T')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
          'QScore T'
        ])
        onMercuryValidationTestsPage.whenWeUnpinTheTableColumn('QScore T')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
          'QScore T'
        ])
        // Mean Depth
        onMercuryValidationTestsPage.whenWeHideTableColumn('Mean Depth')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
          'Mean Depth'
        ])
        onMercuryValidationTestsPage.whenWeShowTheTableColumn('Mean Depth')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
          'Mean Depth'
        ])
        onMercuryValidationTestsPage.whenWePinTheTableColumn('Mean Depth')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
          'Mean Depth'
        ])
        onMercuryValidationTestsPage.whenWeUnpinTheTableColumn('Mean Depth')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
          'Mean Depth'
        ])
        // Report
        onMercuryValidationTestsPage.whenWeHideTableColumn('Report')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
          'Report'
        ])
        onMercuryValidationTestsPage.whenWeShowTheTableColumn('Report')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
          'Report'
        ])
        onMercuryValidationTestsPage.whenWeUnpinTheTableColumn('Report')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithShownColumns([
          'Report'
        ])
        onMercuryValidationTestsPage.whenWePinTheTableColumnReport('Report')
        onMercuryValidationTestsPage.thenWeShouldHaveTheTableWithHiddenColumns([
          'Report'
        ])
      });
  
      it('MER-T246-12: Should be able to apply toggle density on the QC Hotspots table', function() {   
        /* ==== STEP 12 ==== */
        onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV');
        onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('caco2_CNV - PON_1000-N_C2_1000-T');
        cy.contains('QC Hotspots', { matchCase: false }).click({ force: true });
        onMercuryValidationTestsPage.whenWeClickOnSmallToggleDensityIcon()
        onMercuryValidationTestsPage.thenWeEnlargeTable()
        onMercuryValidationTestsPage.whenWeClickOnLargeToggleDensityIcon()
        onMercuryValidationTestsPage.thenWeShouldSeeMediumSizeTable()
      });
  
      it('MER-T246-13: Should be able to apply full screen on the QC Hotspots table', function() {   
        /* ==== STEP 13 ==== */
        onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV');
        onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('caco2_CNV - PON_1000-N_C2_1000-T');
        cy.contains('QC Hotspots', { matchCase: false }).click({ force: true });
        onMercuryValidationTestsPage.whenWeClickOnLargeFullScreenIcon()
        onMercuryValidationTestsPage.thenWeShouldDisplayTheTableInFullScreen()
        onMercuryValidationTestsPage.whenWeClickOnSmallFullScreenIcon()
        onMercuryValidationTestsPage.thenWeShouldDisplayTheTableInNormalSize()
      });
  
      it('MER-T246-14: Should be able to apply filters on the QC Hotspots table', function() {   
        /* ==== STEP 14 ==== */
        onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV');
        onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('caco2_CNV - PON_1000-N_C2_1000-T');
        cy.contains('QC Hotspots', { matchCase: false }).click({ force: true });
  
        onMercuryValidationTestsPage.whenWeApplyFilter('Somatic mutated')
        onMercuryValidationTestsPage.thenWeShouldSeeTableResults('Somatic mutated', [
          'Somatic',
          'Somatic'
        ])
        onMercuryValidationTestsPage.whenWeApplyFilter('Germline mutated')
        onMercuryValidationTestsPage.thenWeShouldSeeTableResults('Germline mutated', [
          'No records to display'
        ])
        onMercuryValidationTestsPage.whenWeApplyFilter('Somatic Uncertain')
        onMercuryValidationTestsPage.thenWeShouldSeeTableResults('Somatic Uncertain', [
          'Not Mutated',
          'Not Mutated',
        ])
  
        onMercuryValidationTestsPage.whenWeApplyFilter('WT')
        onMercuryValidationTestsPage.thenWeShouldSeeTableResults('WT', [
          'Not Mutated',
          'Not Mutated',
          'Not Mutated',
          'Not Mutated',
          'Not Mutated',
          'Not Mutated',
          'Not Mutated'
        ])
  
        onMercuryValidationTestsPage.whenWeApplyFilter('Not Covered')
        onMercuryValidationTestsPage.thenWeShouldSeeTableResults('Not Covered', [
          'Not covered',
          'Not covered',
          'Not covered',
          'Not covered',
          'Not covered',
          'Not covered',
          'Not covered'
        ])
  
        onMercuryValidationTestsPage.whenWeApplyFilter('Pass')
        onMercuryValidationTestsPage.thenWeShouldSeeTableResults('Pass', [
          'Not Mutated',
          'Not Mutated',
          'Not Mutated',
          'Not Mutated',
          'Not Mutated',
          'Not Mutated',
          'Not Mutated'
        ])
  
        onMercuryValidationTestsPage.whenWeApplyFilter('Low coverage')
        onMercuryValidationTestsPage.thenWeShouldSeeTableResults('Low coverage', [
          'Not Mutated',
          'Not Mutated',
          'Not Mutated',
          'Not Mutated',
          'Not Mutated',
          'Not Mutated',
          'Not Mutated'
        ])
  
        onMercuryValidationTestsPage.whenWeApplyFilter('Failed')
        onMercuryValidationTestsPage.thenWeShouldSeeTableResults('Failed', [
          'Not covered',
          'Not covered',
          'Not covered',
          'Not covered',
          'Not covered',
          'Not covered',
          'Not covered'
        ])
  
        onMercuryValidationTestsPage.whenWeSearchGeneName('GNA11')
        onMercuryValidationTestsPage.thenWeShouldSeeTableGenesResults([
          'GNA11',
          'GNA11',
          'GNA11',
          'GNA11',
          'GNA11'
        ])
        onMercuryValidationTestsPage.whenWeSearchVariantName('c.548G>A')
        onMercuryValidationTestsPage.thenWeShouldSeeTableVariantsResults([
          'c.548G>A',
          'c.548G>A'
        ])
      });
  
      it('MER-T246-15: Should be able to check information bubble of each filter on the QC Hotspots page', function() {   
        /* ==== STEP 15 ==== */
        onMercuryValidationTestsPage.whenWeSelectAnalysis('caco2_CNV');
        onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('caco2_CNV - PON_1000-N_C2_1000-T');
        cy.contains('QC Hotspots', { matchCase: false }).click({ force: true });
        onMercuryValidationTestsPage.thenWeRedsetTheFilters()
        cy.contains('RESET FILTERS', { matchCase: false }).click({ force: true });
        onMercuryValidationTestsPage.whenWeMouseOverTheInformationIconOfFilter('Pass')
        onMercuryValidationTestsPage.thenWeShouldSeeTheInformation('Pass', 'Depth > 70X')
        onMercuryValidationTestsPage.whenWeMouseOverTheInformationIconOfFilter('Low coverage')
        onMercuryValidationTestsPage.thenWeShouldSeeTheInformation('Low coverage', '0X < Depth <= 70X')
        onMercuryValidationTestsPage.whenWeMouseOverTheInformationIconOfFilter('Failed')
        onMercuryValidationTestsPage.thenWeShouldSeeTheInformation('Failed', '0X')
      });
  
      it('Should display the time load of the main homepage', () => {
        cy.displayTimeLoadOf()
      })
    })

    describe('MER-T255 (1.0): QC gènes', () => {
      before(function () {
        onMercurySmokeTestsPage.givenWeAreOnTheLoginPage()
      })
      // Vérifier que toutes les infos de qualité et de couverture au niveau de chaque gène d'intérêt sont disponibles et intégrables au rapport
      // Uniquement pour les analyses de panels de gènes
      it('MER-T255: Should visit the QC genes page', function() {
        /* ==== STEP 1 ==== */
        onMercurySmokeTestsPage.whenWeFillInLoginFieldWith('bioinf')
        onMercurySmokeTestsPage.andWeFillInPasswordFieldWith('bioinf')
        onMercurySmokeTestsPage.andWeClickOnSubmitButton()
        onMercurySmokeTestsPage.thenWeShouldBeLoggedOnTheMainHomePageLocatedAtUrl('https://mercury-react-kqwuw7jkta-ew.a.run.app/')
        /* ==== STEP 2 ==== */
        cy.get(':nth-child(1) > .css-ojvzib > .MuiTypography-root').click({force: true});
        cy.get('[style="transform: translate(10px, 1270px); width: 445px; height: 95px; position: absolute;"] > .MuiPaper-root > .css-ozvo54 > .css-8v90jo > .css-hp68mp > .css-0').click({force: true});
        onMercurySmokeTestsPage.thenWeShouldBeLoggedOnThePageLocatedAtUrl('https://mercury-react-kqwuw7jkta-ew.a.run.app/analyzes/11491/overview')
        cy.contains('QC GENES', { matchCase: false })
        cy.contains('403/638', { matchCase: false })
        /* ==== STEP 3 ==== */
        cy.get('.MuiList-root > :nth-child(2) > .MuiTypography-root').click({force: true});
        cy.get('.MuiList-root > :nth-child(2) > .MuiTypography-root').click({force: true});
        cy.get(':nth-child(4) > [data-testid="ExpandMoreIcon"]').click({force: true});
        cy.get('[href="/analyzes/11491/qc/genes"]').click({force: true});
        /* ==== 4 ==== */
        onMercurySmokeTestsPage.thenWeShouldBeLoggedOnThePageLocatedAtUrl('https://mercury-react-kqwuw7jkta-ew.a.run.app/analyzes/11491/qc/genes')
        cy.contains('OVERVIEW', { matchCase: false }).click({force: true});
        onMercurySmokeTestsPage.thenWeShouldBeLoggedOnThePageLocatedAtUrl('https://mercury-react-kqwuw7jkta-ew.a.run.app/analyzes/11491/overview')
        cy.contains('QC GENES', { matchCase: false })
        // View filters
        cy.get('[style="transform: translate(10px, 1270px); width: 445px; height: 95px; position: absolute;"] > .MuiPaper-root > .css-ozvo54 > .css-8v90jo > .css-hp68mp > .css-hpwgno > .MuiButton-root > .MuiTypography-root').click();
        cy.get('.MuiPaper-elevation3 > .MuiTypography-root').click();
        cy.get('.MuiPaper-elevation3 > .MuiTypography-root').should('have.text', 'Qc Genes filters');
        cy.get('h2').click();
        cy.get('h2').should('have.text', 'Normal filters');
        cy.get(':nth-child(1) > .MuiPaper-root > h3').click();
        cy.get(':nth-child(1) > .MuiPaper-root > h3').should('have.text', 'Gene names');
        cy.get('.MuiGrid-container > :nth-child(1) > .MuiPaper-root > .MuiBox-root').click();
        cy.get('.MuiGrid-container > :nth-child(1) > .MuiPaper-root > .MuiBox-root').should('have.text', 'No data');
        cy.get(':nth-child(2) > .MuiPaper-root > h3').click();
        cy.get(':nth-child(2) > .MuiPaper-root > h3').should('have.text', 'Coverage quality');
        cy.get('.MuiPaper-root > .MuiBox-root > ul > :nth-child(1)').click();
        cy.get('.MuiPaper-root > .MuiBox-root > ul > :nth-child(1)').click();
        cy.get('.MuiPaper-root > .MuiBox-root > ul > :nth-child(1)').click();
        cy.get('.MuiPaper-root > .MuiBox-root > ul > :nth-child(1)').should('have.text', 'FAILED');
        cy.get('.MuiPaper-root > .MuiBox-root > ul > :nth-child(2)').click();
        cy.get('.MuiPaper-root > .MuiBox-root > ul > :nth-child(2)').should('have.text', 'Low Coverage');
        cy.get('.MuiGrid-container > :nth-child(3) > .MuiPaper-root').click();
        cy.get(':nth-child(3) > .MuiPaper-root > h3').should('have.text', 'Transcript names');
        cy.get('.MuiGrid-container > :nth-child(3) > .MuiPaper-root > .MuiBox-root').click();
        cy.get('.MuiGrid-container > :nth-child(3) > .MuiPaper-root > .MuiBox-root').should('have.text', 'No data');
        cy.get('[data-testid="CloseIcon"]').click();
        // Nb de gènes en Warning
        cy.contains('403/638', { matchCase: false })
        /* ==== 5 ==== */
        cy.contains('403/638', { matchCase: false }).click({force: true});
        onMercurySmokeTestsPage.thenWeShouldBeLoggedOnThePageLocatedAtUrl('https://mercury-react-kqwuw7jkta-ew.a.run.app/analyzes/11491/qc/genes')
        cy.get('.MuiTablePagination-displayedRows').click();
        cy.get('.MuiTablePagination-displayedRows').should('be.visible');
        cy.get('.MuiTablePagination-displayedRows').click();
        cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-50 of 403 (from 606 total entries)');
        /* ==== 6 ==== */
        cy.get('.MuiTable-root').should('be.visible');
        cy.get('[data-testid="FullscreenIcon"]').click();
        cy.get('.MuiTableCell-alignLeft > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').should('have.text', 'Gene');
        cy.get('.css-1poaz4b > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').should('have.text', 'Transcript');
        cy.get('.css-f4jk41 > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').should('have.text', '# exons Transcript');
        cy.get('.css-ufp8w > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').should('have.text', 'by the kit provider');
        cy.get('.css-2tta85 > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').should('have.text', 'Failed / Low coverage');
        cy.get('.css-y3ksxw > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').should('have.text', 'exons failed (%)');
        cy.get('.css-ty0240 > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper > .MuiBox-root').should('have.text', 'intersect  capture kit (%)');
        cy.get('.css-62qajy > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels').should('have.text', 'Coverage Quality0');
        cy.get('.css-1nw8b37 > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').should('have.text', 'Report');
  
        // Vérifier que le tableau est remplie
        cy.get('.MuiTable-root')
          .find("tr")
          .should('not.be.empty')
          .then((rows) => {
              rows.toArray().forEach((element) => {
              if (element.innerHTML.length !== 0) {
                return true
              }
            });
          });
        /* ==== 7 ==== */
        cy.get(':nth-child(2) > .css-12ppf1e > .css-1yjo05o > .MuiIconButton-root > [data-testid="CommentIcon"] > path').click();
        cy.contains('Test Cypress.', { matchCase: false })
        // cy.get('#mui-292').click();
        cy.get('.MuiBox-root > .MuiLoadingButton-root').click();
        cy.get(':nth-child(5) > .css-12ppf1e > .css-1yjo05o > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get(':nth-child(5) > .css-12ppf1e > .css-1yjo05o > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        /* ==== 8 ==== */
        cy.get(':nth-child(5) > .css-cwgo54').click();
        cy.get(':nth-child(5) > .css-cwgo54').should('have.text', '0');
        cy.get(':nth-child(6) > .css-cwgo54').click();
        cy.get(':nth-child(6) > .css-cwgo54').should('have.text', '0');
        cy.get(':nth-child(7) > .css-cwgo54').click();
        cy.get(':nth-child(7) > .css-cwgo54').should('have.text', '0');
        cy.get('.css-2tta85 > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .MuiBadge-root > .MuiButtonBase-root > [data-testid="ArrowDownwardIcon"] > path').click();
        cy.get(':nth-child(5) > .css-cwgo54').click();
        cy.get(':nth-child(5) > .css-cwgo54').should('have.text', '3');
        cy.get(':nth-child(6) > .css-cwgo54').click();
        cy.get(':nth-child(6) > .css-cwgo54').should('have.text', '3');
        cy.get(':nth-child(7) > .css-cwgo54').click();
        cy.get(':nth-child(7) > .css-cwgo54').should('have.text', '3');
        /* ==== 9 ==== */
        // cy.scrollTo('bottom')
        //10
        cy.contains('Rows per page')
          .parent()
          .find('div[role="button"]')
          .click()
        cy.get('li[data-value="10"]').should('be.visible').click();
        cy.get('tbody tr').should('have.length', 10)
        cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-10 of 403 (from 606 total entries)');
        //25
        cy.contains('Rows per page')
          .parent()
          .find('div[role="button"]')
          .click()
        cy.get('li[data-value="25"]').should('be.visible').click();
        cy.get('tbody tr').should('have.length', 25)
        cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-25 of 403 (from 606 total entries)');
        //50
        cy.contains('Rows per page')
          .parent()
          .find('div[role="button"]')
          .click()
        cy.get('li[data-value="50"]').should('be.visible').click();
        cy.get('tbody tr').should('have.length', 50)
        cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-50 of 403 (from 606 total entries)');
        //100
        cy.contains('Rows per page')
          .parent()
          .find('div[role="button"]')
          .click()
        cy.get('li[data-value="100"]').should('be.visible').click();
        cy.get('tbody tr').should('have.length', 100)
        cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-100 of 403 (from 606 total entries)');
        /* ==== 10 ==== */
        cy.get('[data-testid="KeyboardArrowRightIcon"]').click({force: true});
        cy.get('[data-testid="KeyboardArrowRightIcon"] > path').click({force: true});
        cy.get('[data-testid="KeyboardArrowRightIcon"]').click({force: true});
        cy.get('[data-testid="KeyboardArrowRightIcon"]').click({force: true});
        cy.get('.MuiTablePagination-displayedRows').click({force: true});
        cy.get('.MuiTablePagination-displayedRows').should('have.text', '401-403 of 403 (from 606 total entries)');
        cy.get('[data-testid="FirstPageIcon"] > path').click({force: true});
        /* ==== 11 ==== */
        cy.get('[data-testid="DensitySmallIcon"]').click();
        cy.get('[data-testid="DensityLargeIcon"]').click();
        /* ==== 12 ==== */
        cy.get('button[type="button"] > svg[data-testid="FullscreenExitIcon"]').click({force: true});
        // cy.get('button[type="button"] > svg[data-testid="FullscreenIcon"]').click({force: true});
        // cy.get('button[type="button"] > svg[data-testid="FullscreenExitIcon"]').click({force: true});
        /* ==== 13 ==== */
        cy.get(':nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get(':nth-child(3) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.MuiLoadingButton-root').click();
        // Pass
        cy.get('.css-1iep9ha > :nth-child(1) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        cy.get('.MuiLoadingButton-root').click();
        cy.get('.css-1iep9ha > :nth-child(1) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        // Low Coverage
        cy.get(':nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        cy.get('.MuiLoadingButton-root').click();
        cy.get(':nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        // Failed
        cy.get(':nth-child(3) > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        cy.get('.MuiLoadingButton-root').click();
        cy.get(':nth-child(3) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
  
        // Search by gene AR
        cy.get('input[type="text"][placeholder="Search for gene names..."]').clear();
        cy.get('input[type="text"][placeholder="Search for gene names..."]').type(`AR{enter}`, { force: true });
        cy.get('.MuiGrid-container').click();
        cy.get('.css-tzsjye > .MuiTypography-root').should('have.text', 'All gene names are valid');
        cy.get('.MuiLoadingButton-root').click();
        cy.get('.css-1pzyx91 > .MuiTypography-root').should('have.text', 'AR ');
        cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-1 of 1 (from 606 total entries)');
  
        // Search by transcript
        cy.get('[data-testid="CancelIcon"]').click();
        cy.get('.MuiLoadingButton-root').click();
        cy.get('textarea[rows="2"]').type('NM_000044.6');
        cy.get('.MuiLoadingButton-root').click();
        cy.contains('NM_000044.6', { matchCase: false })
        // cy.get('.css-zm9pux > .MuiButton-root').should('have.text', 'NM_000044.6');
        cy.contains('NM_000044.6', { matchCase: false })
        cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-1 of 1 (from 606 total entries)');
        cy.get('.MuiTablePagination-root > .MuiToolbar-root').click(); 
        // Reset filters
        cy.get('.css-1t62lt9 > .MuiButton-outlined').click();
        cy.get('.css-1iep9ha > :nth-child(1) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('have.value', 'PASS');
        cy.get('.css-1iep9ha > :nth-child(1) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get(':nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('have.value', 'Low Coverage');
        cy.get(':nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get(':nth-child(3) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('have.value', 'FAILED');
        cy.get(':nth-child(3) > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        // cy.get('#mui-147').click();
        cy.get(':nth-child(2) > .MuiOutlinedInput-root').click();
        cy.contains('NM_000044.6', { matchCase: false })
        cy.get('.css-1t62lt9 > .MuiButton-outlined').click();
        /* ==== 14 ==== */
        // i for Pass filter
        cy.get(':nth-child(1) > .MuiTypography-root > .MuiChip-root > .MuiChip-label > [data-testid="InfoOutlinedIcon"]').click();
        cy.get('.css-1iep9ha > :nth-child(1) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.MuiTooltip-tooltip').click();
        cy.should('be.visible');
        cy.should('have.text', '% exons failed* = 0');
        cy.get('body').type('{esc}')
        // cy.scrollTo('top')
  
        // i for Low Coverage filter
        cy.get(':nth-child(2) > .MuiTypography-root > .MuiChip-root > .MuiChip-label > [data-testid="InfoOutlinedIcon"]').click();
        cy.get('.css-1iep9ha > :nth-child(2) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.MuiTooltip-tooltip').click();
        cy.should('be.visible');
        cy.should('have.text', '% exons failed* < 40 & % exons failed* > 0');
        cy.get('body').type('{esc}')
        // cy.scrollTo('top')
  
        // i for Failed filter
        cy.get(':nth-child(3) > .MuiTypography-root > .MuiChip-root > .MuiChip-label > [data-testid="InfoOutlinedIcon"]').click();
        cy.get('.css-1iep9ha > :nth-child(3) > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get('.MuiTooltip-tooltip').click();
        cy.should('be.visible');
        cy.should('have.text', '% exons failed* >= 40');
        cy.get('body').type('{esc}')
        // cy.scrollTo('top')
      });
  
      it('Should display the time load of the main homepage', () => {
        cy.displayTimeLoadOf()
      })
    })

    describe('MER-T256 (1.0): QC par exon', () => {
      beforeEach(function () {
        onMercurySmokeTestsPage.givenWeAreOnTheLoginPage()
        /* ==== STEP 1 ==== */
        onMercurySmokeTestsPage.whenWeLoginToMercuryWithTheAccess('bioinf', 'bioinf')
        cy.viewport(1280, 720)
      })
      // Vérifier que toutes les infos de qualité et de couverture au niveau de chaque gène d'intérêt sont disponibles et intégrables au rapport
      // Uniquement pour les analyses de panels de gènes
      it('MER-T256-1-to-4: Should be on the analysis overview page', function() {   
        /* ==== STEP 2 ==== */
        onMercuryValidationTestsPage.whenWeSelectAnalysis('PPD_noid5648854')
        onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('PPD_noid5648854')
        cy.contains('PPD_noid5648854 - PPD_noid5648854', { matchCase: false })
        cy.contains('QC GENES', { matchCase: false }).should('be.visible')
      });
  
      it('MER-T256-3: Should be on the analysis QC genes page', function() {
         onMercuryValidationTestsPage.whenWeSelectAnalysis('PPD_noid5648854')
         onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('PPD_noid5648854')
         cy.contains('PPD_noid5648854 - PPD_noid5648854', { matchCase: false })
         /* ==== STEP 3 ==== */
         cy.contains('QC GENES', { matchCase: false }).click({ force: true });
         cy.contains('NM_000038.6', { matchCase: false }).click({ force: true });
         cy.contains('PPD_noid5648854 - PPD_noid5648854', { matchCase: false });
         cy.contains('Exons', { matchCase: false });
      });
  
      it('MER-T256-4: Should display the QC genes 2 parts graph of the analysis', function() {
        let geneOfTranscript = 'APC'
        let gene = new RegExp(geneOfTranscript, 'g')
        let transcriptFromGene = 'NM_000038.6'
        let transcript = new RegExp(transcriptFromGene, 'g')
        onMercuryValidationTestsPage.whenWeSelectAnalysis('PPD_noid5648854')
        onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('PPD_noid5648854')
        cy.contains('PPD_noid5648854 - PPD_noid5648854', { matchCase: false })
        /* ==== STEP 4 ==== */
        cy.contains('QC GENES', { matchCase: false }).click({ force: true });
        cy.contains('NM_000038.6', { matchCase: false }).click({ force: true });
        cy.get('.css-n50xto > .MuiBox-root').should('be.visible');
        cy.get('.css-n50xto > .MuiBox-root').should('have.attr', 'alt', 'exons');
        cy.get('.css-n50xto > .MuiBox-root').invoke('attr', 'src').then((srcText) => {expect(srcText).to.match(transcript)});
        cy.get('.css-n50xto > .MuiBox-root').invoke('attr', 'src').then((srcText) => {expect(srcText).to.match(gene)});
      });
  
      it('MER-T256-5: Should display the QC genes table of the analysis', function() {
        onMercuryValidationTestsPage.whenWeSelectAnalysis('PPD_noid5648854')
        onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('PPD_noid5648854')
        cy.contains('PPD_noid5648854 - PPD_noid5648854', { matchCase: false })
        /* ==== STEP 5 ==== */
        cy.contains('QC GENES', { matchCase: false }).click({ force: true });
        cy.contains('NM_000038.6', { matchCase: false }).click({ force: true });
        cy.scrollTo('bottom')
        cy.get('.css-1ghrqym > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').contains('Exon', { matchCase: false })
        cy.get('.css-ohp0t6 > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').contains('Cov Graph', { matchCase: false })
        cy.get('.css-1o3bbsy > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').contains('Coverage Quality', { matchCase: false })
        cy.get('.css-e75nar > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').contains('Start Exon', { matchCase: false })
        cy.get('.css-u6jq51 > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').contains('End Exon', { matchCase: false })
        cy.get('.css-rtb7z0 > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').contains('Strand', { matchCase: false })
        cy.get('.css-743wy4 > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').contains('Size Exon', { matchCase: false })
        cy.get('.css-30gq96 > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').contains('intersect Capture Kit (%)', { matchCase: false })
        cy.get('.css-1ehhyba > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').contains('Mean Depth T', { matchCase: false })
        cy.get('.css-14i1av3 > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').contains('Coord Regions <= 100X', { matchCase: false })
        cy.get('.css-br432s > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').contains('100X T', { matchCase: false })
        cy.get('.css-itovap > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').contains('500X T', { matchCase: false })
        cy.get('.css-wo4040 > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').contains('1000X T', { matchCase: false })
        cy.get('.css-18m3qwl > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').contains('% Coverage', { matchCase: false })
        // Le graph de couverture de l'exon est visible lorsqu'on passe la souris sur l'icône
        cy.get(':nth-child(1) > .css-oega7n > .MuiChip-root > .MuiChip-label > [data-testid="EqualizerIcon"]').should('be.visible');
  
        // TODO: créer une commande checkExonsTableColumnsLabel (refacto)
        // cy.checkExonsTableColumnsLabel([
        //   'Exon',
        //   'Cov Graph',
        //   'Coverage Quality',
        //   'Start Exon',
        //   'End Exon',
        //   'Strand',
        //   'Size Exon',
        //   'intersect Capture Kit (%)',
        //   'Mean Depth T',
        //   'Coord Regions <= 100X',
        //   '100X T',
        //   '500X T',
        //   '1000X T'
        // ])
  
      });
  
      it('MER-T256-6: Should be able to sort the QC genes table of the analysis', function() {
        onMercuryValidationTestsPage.whenWeSelectAnalysis('PPD_noid5648854')
        onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('PPD_noid5648854')
        cy.contains('PPD_noid5648854 - PPD_noid5648854', { matchCase: false })
        /* ==== STEP 6 ==== */
        cy.contains('QC GENES', { matchCase: false }).click({ force: true });
        cy.contains('NM_000038.6', { matchCase: false }).click({ force: true });
        cy.get('.css-1ghrqym > .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Labels > .Mui-TableHeadCell-Content-Wrapper').should('have.text', 'Exon');
        cy.get(':nth-child(1) > .css-11pei9p').should('have.text', '2');
        cy.get(':nth-child(2) > .css-11pei9p').should('have.text', '3');
        cy.get(':nth-child(3) > .css-11pei9p').should('have.text', '4');
        cy.get(':nth-child(4) > .css-11pei9p').should('have.text', '5');
        cy.get(':nth-child(5) > .css-11pei9p').should('have.text', '6');
        // Tri par ordre décroissant
        cy.get('.MuiButtonBase-root > [data-testid="ArrowDownwardIcon"] > path').click();
        cy.get('.MuiButtonBase-root > [data-testid="ArrowDownwardIcon"]').click();
        cy.get(':nth-child(1) > .css-11pei9p').should('have.text', '16');
        cy.get(':nth-child(2) > .css-11pei9p').should('have.text', '15');
        cy.get(':nth-child(3) > .css-11pei9p').should('have.text', '14');
        cy.get(':nth-child(4) > .css-11pei9p').should('have.text', '13');
        cy.get(':nth-child(5) > .css-11pei9p').should('have.text', '12');
      });
  
      it('MER-T256-7: Should be able to modify the entries of the QC genes table of the analysis', function() {
        onMercuryValidationTestsPage.whenWeSelectAnalysis('PPD_noid5648854')
        onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('PPD_noid5648854')
        cy.contains('PPD_noid5648854 - PPD_noid5648854', { matchCase: false })
        /* ==== STEP 7 ==== */
        cy.contains('QC GENES', { matchCase: false }).click({ force: true });
        cy.contains('NM_000038.6', { matchCase: false }).click({ force: true });
        //10
        cy.contains('Rows per page')
          .parent()
          .find('div[role="button"]')
          .click()
        cy.get('li[data-value="10"]').should('be.visible').click();
        cy.get('tbody tr').should('have.length', 10)
        cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-10 of 15');
        //25
        cy.contains('Rows per page')
          .parent()
          .find('div[role="button"]')
          .click()
        cy.get('li[data-value="25"]').should('be.visible').click();
        cy.get('tbody tr').should('have.length', 15)
        cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-15 of 15');
        //50
        cy.contains('Rows per page')
          .parent()
          .find('div[role="button"]')
          .click()
        cy.get('li[data-value="50"]').should('be.visible').click();
        cy.get('tbody tr').should('have.length', 15)
        cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-15 of 15');
        //100
        cy.contains('Rows per page')
          .parent()
          .find('div[role="button"]')
          .click()
        cy.get('li[data-value="100"]').should('be.visible').click();
        cy.get('tbody tr').should('have.length', 15)
        cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-15 of 15');
      });
  
      it('MER-T256-8: Should be able to browse via arrows into the QC genes table of the analysis', function() {
        onMercuryValidationTestsPage.whenWeSelectAnalysis('PPD_noid5648854')
        onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('PPD_noid5648854')
        cy.contains('PPD_noid5648854 - PPD_noid5648854', { matchCase: false })
        /* ==== STEP 8 ==== */
        cy.contains('QC GENES', { matchCase: false }).click({ force: true });
        cy.contains('NM_000038.6', { matchCase: false }).click({ force: true });
        // Afficher 10 rangées par page
        cy.contains('Rows per page')
          .parent()
          .find('div[role="button"]')
          .click()
        cy.get('li[data-value="10"]').should('be.visible').click();
        cy.get('tbody tr').should('have.length', 10)
        cy.get('.MuiTablePagination-displayedRows').should('have.text', '1-10 of 15');
        // Défilement des pages
        cy.get('[data-testid="KeyboardArrowRightIcon"]').click({force: true});
        cy.get('[data-testid="KeyboardArrowRightIcon"] > path').click({force: true});
        cy.get('[data-testid="KeyboardArrowRightIcon"]').click({force: true});
        cy.get('[data-testid="KeyboardArrowRightIcon"]').click({force: true});
        cy.get('.MuiTablePagination-displayedRows').click({force: true});
        cy.get('.MuiTablePagination-displayedRows').should('have.text', '11-15 of 15');
      });
  
      it('MER-T256-9: Should be able to apply toggle density on the QC genes table of the analysis', function() {
        onMercuryValidationTestsPage.whenWeSelectAnalysis('PPD_noid5648854')
        onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('PPD_noid5648854')
        cy.contains('PPD_noid5648854 - PPD_noid5648854', { matchCase: false })
        /* ==== STEP 9 ==== */
        cy.contains('QC GENES', { matchCase: false }).click({ force: true });
        cy.contains('NM_000038.6', { matchCase: false }).click({ force: true });
        cy.get('[data-testid="DensitySmallIcon"]').should('be.visible');
        cy.get('[data-testid="DensitySmallIcon"]').should('have.attr', 'data-testid', 'DensitySmallIcon');
        cy.get('.css-18m3qwl').click();
        cy.get('[data-testid="DensitySmallIcon"]').should('have.attr', 'focusable', 'false');
        cy.get('.MuiTable-root').click();
        cy.get('.css-1ag9q10').click();
        // Agrandissement tableau
        cy.get('[data-testid="DensitySmallIcon"]').click();
        cy.get('[data-testid="DensityLargeIcon"]').should('have.attr', 'focusable', 'false');
        cy.get('[data-testid="DensityLargeIcon"]').should('have.attr', 'data-testid', 'DensityLargeIcon');
        cy.get('[data-testid="DensityLargeIcon"]').should('have.attr', 'viewBox', '0 0 24 24');
      });
  
      it('MER-T256-10: Should be able to apply full screen into the QC genes table of the analysis', function() {
        onMercuryValidationTestsPage.whenWeSelectAnalysis('PPD_noid5648854')
        onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('PPD_noid5648854')
        cy.contains('PPD_noid5648854 - PPD_noid5648854', { matchCase: false })
        /* ==== STEP 10 ==== */
        cy.contains('QC GENES', { matchCase: false }).click({ force: true });
        cy.contains('NM_000038.6', { matchCase: false }).click({ force: true });
        cy.get('[data-testid="FullscreenIcon"]').should('be.visible');
        cy.get('[data-testid="FullscreenIcon"] > path').should('have.attr', 'd', 'M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z');
        cy.get('[data-testid="FullscreenIcon"]').click();
        cy.get('[data-testid="FullscreenExitIcon"]').should('be.visible');
        cy.get('[data-testid="FullscreenExitIcon"]').should('have.attr', 'focusable', 'false');
        cy.get('[data-testid="FullscreenExitIcon"]').should('have.attr', 'viewBox', '0 0 24 24');
        cy.get('[data-testid="FullscreenExitIcon"]').should('have.attr', 'data-testid', 'FullscreenExitIcon');
        cy.get('[data-testid="FullscreenExitIcon"]').click();
        cy.get('[data-testid="FullscreenIcon"]').should('have.attr', 'data-testid', 'FullscreenIcon');
      });
  
      it('MER-T256-11: Should be able to apply various filters into the QC genes table of the analysis', function() {
        onMercuryValidationTestsPage.whenWeSelectAnalysis('PPD_noid5648854')
        onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('PPD_noid5648854')
        cy.contains('PPD_noid5648854 - PPD_noid5648854', { matchCase: false })
        /* ==== STEP 11 ==== */
        cy.contains('QC GENES', { matchCase: false }).click({ force: true });
        cy.contains('NM_000038.6', { matchCase: false }).click({ force: true });
        cy.contains('RESET FILTERS', { matchCase: false }).click({ force: true });
        cy.get(':nth-child(1) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get(':nth-child(3) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get(':nth-child(1) > .MuiFormControlLabel-root > .MuiTypography-root > .MuiChip-root > .MuiChip-label').should('have.text', 'Pass');
        cy.get(':nth-child(1) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').should('not.be.checked');
        cy.get(':nth-child(1) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        cy.get(':nth-child(1) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get('.MuiLoadingButton-root').click();
        cy.get(':nth-child(1) > .css-17pql7f').should('have.text', 'PASS');
        cy.get(':nth-child(2) > .css-17pql7f').should('have.text', 'PASS');
        cy.get(':nth-child(3) > .css-17pql7f').should('have.text', 'PASS');
        cy.get(':nth-child(4) > .css-17pql7f').should('have.text', 'PASS');
        cy.get(':nth-child(5) > .css-17pql7f').should('have.text', 'PASS');
        cy.get(':nth-child(1) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiTypography-root > .MuiChip-root > .MuiChip-label').should('have.text', 'Low Coverage');
        cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').should('not.be.checked');
        cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get('.MuiLoadingButton-root').click();
        cy.get('.css-1vv9e53').should('have.text', 'LOW COVERAGE');
        cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get(':nth-child(3) > .MuiFormControlLabel-root > .MuiTypography-root > .MuiChip-root > .MuiChip-label').should('have.text', 'Failed');
        cy.get(':nth-child(3) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').should('not.be.checked');
        cy.get(':nth-child(3) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        cy.get(':nth-child(3) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get('.MuiLoadingButton-root').click();
        cy.get('td > .MuiTypography-root').should('have.text', 'No records to display');
        cy.get(':nth-child(3) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').uncheck();
        cy.get(':nth-child(4) > .MuiFormControlLabel-root > .MuiTypography-root > .MuiChip-root > .MuiChip-label').should('have.text', 'Not Covered');
        cy.get(':nth-child(4) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').check();
        cy.get(':nth-child(4) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get('.MuiLoadingButton-root').click();
        cy.get('td > .MuiTypography-root').should('have.text', 'No records to display');
        // Reset filters
        cy.contains('RESET FILTERS', { matchCase: false }).click({ force: true });
        cy.get(':nth-child(1) > .MuiFormControlLabel-root > .MuiTypography-root > .MuiChip-root > .MuiChip-label').should('have.text', 'Pass');
        cy.get(':nth-child(1) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiTypography-root > .MuiChip-root > .MuiChip-label').should('have.text', 'Low Coverage');
        cy.get(':nth-child(2) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get(':nth-child(3) > .MuiFormControlLabel-root > .MuiTypography-root > .MuiChip-root > .MuiChip-label').should('have.text', 'Failed');
        cy.get(':nth-child(3) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').should('be.checked');
        cy.get(':nth-child(4) > .MuiFormControlLabel-root > .MuiTypography-root > .MuiChip-root > .MuiChip-label').should('have.text', 'Not Covered');
        cy.get(':nth-child(4) > .MuiFormControlLabel-root > .MuiCheckbox-root > .PrivateSwitchBase-input').should('not.be.checked');
      });
  
      it('MER-T256-12: Should be able to display bubble infos of the various filters into the QC genes table of the analysis', function() {
        onMercuryValidationTestsPage.whenWeSelectAnalysis('PPD_noid5648854')
        onMercuryValidationTestsPage.thenWeAreOnOverviewPageOfAnalysis('PPD_noid5648854')
        cy.contains('PPD_noid5648854 - PPD_noid5648854', { matchCase: false })
        /* ==== STEP 12 ==== */
        cy.contains('QC GENES', { matchCase: false }).click({ force: true });
        cy.contains('NM_000038.6', { matchCase: false }).click({ force: true });
        cy.contains('RESET FILTERS', { matchCase: false }).click({ force: true });
        cy.contains('Pass', { matchCase: false});
        cy.getBySel('InfoOutlinedIcon').eq(0).trigger('mouseover');
        cy.contains('The coverage of targeted exon at 100X is >= 100%');
        cy.getBySel('InfoOutlinedIcon').eq(0).type('{esc}');
        cy.contains('Low Coverage', { matchCase: false});
        cy.getBySel('InfoOutlinedIcon').eq(1).trigger('mouseover');
        cy.contains('The coverage of targeted exon at 100X is >= 95% & < 100%');
        cy.getBySel('InfoOutlinedIcon').eq(1).type('{esc}');
        cy.contains('Failed', { matchCase: false});
        cy.getBySel('InfoOutlinedIcon').eq(2).trigger('mouseover')
        cy.contains('The coverage of targeted exon at 100X is < 95%');
        cy.getBySel('InfoOutlinedIcon').eq(2).type('{esc}');
        cy.contains('Not Covered', { matchCase: false});
        cy.getBySel('InfoOutlinedIcon').eq(3).trigger('mouseover');
        cy.contains('The exon is not targeted by the kit provider');
        cy.getBySel('InfoOutlinedIcon').eq(3).type('{esc}');
        cy.contains('RESET FILTERS', { matchCase: false }).click({ force: true });
      });
  
      it('Should display the time load of the main homepage', () => {
        cy.displayTimeLoadOf()
      })
    })
  
})