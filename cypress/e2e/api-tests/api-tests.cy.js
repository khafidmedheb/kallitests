import { onMercuryLoginPage } from '../../support/pageObjects/mercuryLoginPage'
import { onKdmAuthenticationPage } from '../../support/pageObjects/kdmAuthenticationPage'
import { onKdmMainPage } from '../../support/pageObjects/kdmMainPage'
import { onMercuryDashboardPage } from '../../support/pageObjects/mercuryDashboardPage'

import 'cypress-time-marks'

Cypress.config('defaultCommandTimeout', 60000)

let listOfData = ''
const dataTests = onKdmMainPage.getTheReferenceData()
const reference = onKdmAuthenticationPage.getTheReferenceData()

/* 
    API - Smoketests
*/

/* 
  Mercury - API
*/
describe('Mercury - API - Smoke Tests', () => {
    before(() => {
        onMercuryLoginPage.whenWeGoToTheLoginPage()
    })

    describe('1-Mercury API: Authentication OK with right Email and Password/credentials', () => {
        beforeEach(() => {
            onMercuryLoginPage.whenWeLoginToTheMainDashboardViaTheAPIWithAccess(
                dataTests.emailAdmin3,
                dataTests.password,
                dataTests.oncoshareWorkspace,
            )
        })

        it('Should log in programmatically to the main homepage via the API without using the UI', () => {
            onMercuryDashboardPage.givenWeAreLoggedOncoshareDashboardPage()
            onMercuryDashboardPage.thenWeShouldSeeTheMainTitle('Welcome to Mercury')
            onMercuryDashboardPage.andWeShouldSeeTheWorkspaceLabel('Mercury')
            onMercuryDashboardPage.andTheMainHomePageDisplaysTheLogo('Mercury')
        })
    })

    describe('2-Mercury API: Authentication KO with wrong credentials', () => {
        before(() => {
            onKdmAuthenticationPage.whenWeloginToApiWithBadCredentials(
                reference.invalidMail,
                reference.password,
                'oncoshare',
            )
        })

        it('Should redirect unauthenticated user to login page', () => {
            onKdmAuthenticationPage.thenWeShouldSeeTheDefaultBlankPage()
        })
    })

    describe('3-Mercury API: Read Patient Cases table list', () => {
        beforeEach(() => {
            onMercuryLoginPage.whenWeLoginToTheMainDashboardViaTheAPIWithAccess(
                dataTests.emailAdmin4,
                dataTests.password2,
                dataTests.oncoshareWorkspace,
            )
            cy.fixture('kdmApiData').then(function (data) {
                listOfData = data
            })
        })

        it('should return a list with samples and check the content', () => {
            cy.kdmListResult(
                'https://api.dev-gcp.oncokdm.com/api/v1/sample_sets?page=1&items_by_page=7&ordering=-_ordered_or_created_at',
                listOfData.samples,
            )
        })

        it('should return a list with patient cases and check the content', () => {
            cy.kdmListResult(
                'https://api.dev-gcp.oncokdm.com/api/v1/patient_cases?page=1&ordering=-created_at&items_by_page=7',
                listOfData.patientCases,
            )
        })
    })
})