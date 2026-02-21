import { useEffect } from "react"
import { useSettingsStore, useUserStore } from "../../store/useStore"
import Panel from "../utility/Panel"
import Navigation from "../utility/Navigation"

import { Suspense, lazy } from "react";

const ActivityPage = lazy(() => import("../pages/Activity"))
const EventsPage = lazy(() => import("../pages/Events"))
const PlayPage = lazy(() => import("../pages/Play"))
const ReferralPage = lazy(() => import("../pages/Referral"))
const LeadersPage = lazy(() => import("../pages/Leaders"))
const ProfilePage = lazy(() => import("../pages/Profile"))

const Deposit = lazy(() => import("../modal/Deposit"))
const Withdraw = lazy(() => import("../modal/Withdraw"))
const Rules = lazy(() => import("../modal/Rules"))

import Settings from '../modal/Settings'

import Modal from "../utility/Modal"
import { useTranslation } from "react-i18next"
import i18n from './../../i18n'

function PageLoader() {
    return (
        <div id="page-loader">
            <div className="loader" />
        </div>
    )
}

function App() {
    const { theme, changeTheme, currentPage, setPage, modalStatus, modalType, lang } = useSettingsStore()
    const { loginUser, user } = useUserStore()
    const { t } = useTranslation()

    useEffect(() => {
        const tg = window.Telegram?.WebApp

        if (tg?.initDataUnsafe?.user) {
            loginUser(tg.initDataUnsafe.user)
        } else {
            // demo login
            loginUser(
                {
                    id: 123456789,
                    is_bot: false,
                    first_name: "Egor",
                    last_name: "Ivanov",
                    username: "egor_dev",
                    language_code: "ru",
                    is_premium: true,
                    allows_write_to_pm: true,
                    photo_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s"
                }
            )

        }
    }, [])

    useEffect(() => {
        i18n.changeLanguage(lang)
    }, [lang])

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme)
    }, [theme])

    return (
        <div id="app">
            {modalStatus && (
                <Modal header={t(`header.${modalType}`)}>
                    <Suspense fallback={<PageLoader />}>
                        {modalType === 'deposit' && <Deposit />}
                        {modalType === 'withdraw' && <Withdraw />}
                        {modalType === 'rules' && <Rules />}
                    </Suspense>
                    {modalType === 'settings' && <Settings />}
                </Modal>
            )}
            <Panel />
            <div id="content">
                <Suspense fallback={<PageLoader />}>
                    {currentPage === 'activity-page' && <ActivityPage />}
                    {currentPage === 'events-page' && <EventsPage />}
                    {currentPage === 'play-page' && <PlayPage />}
                    {currentPage === 'referral-page' && <ReferralPage />}
                    {currentPage === 'leaders-page' && <LeadersPage />}
                    {currentPage === 'profile-page' && <ProfilePage />}
                </Suspense>
            </div>

            <Navigation />
        </div>
    )
}

export default App