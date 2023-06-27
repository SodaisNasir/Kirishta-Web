import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  BannerPromotion,
  ContactManagement,
  Dashboard,
  EventsManagement,
  FeedbackManagement,
  Login,
  ParishManagement,
  PopupPromotion,
  PublishBook,
  UsersManagement,
  BooksManagement,
  ChangePassword,
  ForgotPassword,
  EmailVerification,
  FAQManagement,
  PrivacyManagement,
  TermsManagement,
  AboutKirista,
  BookLanguagesManagement,
  BookCategoriesManagement,
  ProvincesManagement,
  RegionsManagement,
  // Privileges,
  RCCGContinent2,
  RCCGStructure,
  AboutRCCG,
  AdminEmail,
  SubAdmin,
  Roles,
  EditProfile,
  GeneralCountriesManagement,
  ParishCountriesManagement,
  ParishCategories,
  Notification,
  AccessDenied,
} from "../pages";
import { AppContext } from "../context";
import { AdminLayout } from "../components";

const Router = () => {
  const { user } = useContext(AppContext);
  let privilages =
    user &&
    (typeof user.privilage === "string"
      ? JSON.parse(user.privilage)
      : user.privilage);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={user ? <AdminLayout /> : <Navigate to="/login" />}
        >
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route
            index
            path="/dashboard"
            element={
              user && privilages.Dashboard ? <Dashboard /> : <AccessDenied />
            }
          />
          <Route
            path="/users-management"
            element={
              user && privilages["Users Management"].View ? (
                <UsersManagement />
              ) : (
                <AccessDenied />
              )
            }
          />
          <Route path="/promotion-management">
            <Route
              path="/promotion-management/banner"
              element={
                user && privilages["Promotion Management"].Banner.View ? (
                  <BannerPromotion />
                ) : (
                  <AccessDenied />
                )
              }
            />
            <Route
              path="/promotion-management/popup"
              element={
                user && privilages["Promotion Management"]["Pop-up"].View ? (
                  <PopupPromotion />
                ) : (
                  <AccessDenied />
                )
              }
            />
            <Route
              path="/promotion-management/notification"
              element={
                user && privilages["Promotion Management"].Notification ? (
                  <Notification />
                ) : (
                  <AccessDenied />
                )
              }
            />
          </Route>
          <Route path="/access">
            {/* <Route path="/access/privileges" element={<Privileges />} /> */}
            <Route
              path="/access/sub-admin"
              element={
                user && privilages.Access["Sub-Admin"].View ? (
                  <SubAdmin />
                ) : (
                  <AccessDenied />
                )
              }
            />
            <Route
              path="/access/roles"
              element={
                user && privilages.Access.Roles.View ? (
                  <Roles />
                ) : (
                  <AccessDenied />
                )
              }
            />
          </Route>
          <Route
            path="/books-management"
            element={
              user && privilages["Books Management"].View ? (
                <BooksManagement />
              ) : (
                <AccessDenied />
              )
            }
          />
          <Route
            path="/publish-book"
            element={
              user && privilages["Publish Book"].View ? (
                <PublishBook />
              ) : (
                <AccessDenied />
              )
            }
          />
          <Route
            path="/parish-management"
            element={
              user && privilages["Parish Management"].View ? (
                <ParishManagement />
              ) : (
                <AccessDenied />
              )
            }
          />
          <Route
            path="/events-management"
            element={
              user && privilages["Events Management"].View ? (
                <EventsManagement />
              ) : (
                <AccessDenied />
              )
            }
          />
          <Route
            path="/feedback-management"
            element={
              user && privilages["Feedback Management"].View ? (
                <FeedbackManagement />
              ) : (
                <AccessDenied />
              )
            }
          />
          <Route
            path="/contact-management"
            element={
              user && privilages["Contact Management"].View ? (
                <ContactManagement />
              ) : (
                <AccessDenied />
              )
            }
          />
          <Route path="/settings">
            <Route
              path="/settings/admin-email"
              element={
                user &&
                privilages["Settings Management"]["Admin Email"].View ? (
                  <AdminEmail />
                ) : (
                  <AccessDenied />
                )
              }
            />
            <Route
              path="/settings/parish-categories"
              element={
                user &&
                privilages["Settings Management"]["Parish Categories"].View ? (
                  <ParishCategories />
                ) : (
                  <AccessDenied />
                )
              }
            />
            <Route
              path="/settings/general-countries"
              element={
                user &&
                privilages["Settings Management"]["General Countries"].View ? (
                  <GeneralCountriesManagement />
                ) : (
                  <AccessDenied />
                )
              }
            />
            <Route
              path="/settings/parish-countries"
              element={
                user &&
                privilages["Settings Management"]["Parish Countries"].View ? (
                  <ParishCountriesManagement />
                ) : (
                  <AccessDenied />
                )
              }
            />
            <Route
              path="/settings/region"
              element={
                user && privilages["Settings Management"].Region.View ? (
                  <RegionsManagement />
                ) : (
                  <AccessDenied />
                )
              }
            />
            <Route
              path="/settings/province"
              element={
                user && privilages["Settings Management"].Province.View ? (
                  <ProvincesManagement />
                ) : (
                  <AccessDenied />
                )
              }
            />
            <Route
              path="/settings/book-category"
              element={
                user &&
                privilages["Settings Management"]["Book Category"].View ? (
                  <BookCategoriesManagement />
                ) : (
                  <AccessDenied />
                )
              }
            />
            <Route
              path="/settings/book-language"
              element={
                user &&
                privilages["Settings Management"]["Book Language"].View ? (
                  <BookLanguagesManagement />
                ) : (
                  <AccessDenied />
                )
              }
            />
            <Route
              path="/settings/about-rccg"
              element={
                user && privilages["Settings Management"]["About RCCG"].View ? (
                  <AboutRCCG />
                ) : (
                  <AccessDenied />
                )
              }
            />
            <Route
              path="/settings/about-rccg-structure"
              element={
                user &&
                privilages["Settings Management"]["About RCCG Structure"]
                  .View ? (
                  <RCCGStructure />
                ) : (
                  <AccessDenied />
                )
              }
            />
            <Route
              path="/settings/about-rccg-continent2"
              element={
                user &&
                privilages["Settings Management"]["About RCCG Continent 2"]
                  .View ? (
                  <RCCGContinent2 />
                ) : (
                  <AccessDenied />
                )
              }
            />
            <Route
              path="/settings/about-kirista"
              element={
                user &&
                privilages["Settings Management"]["About Kirista"].View ? (
                  <AboutKirista />
                ) : (
                  <AccessDenied />
                )
              }
            />
            <Route
              path="/settings/terms"
              element={
                user && privilages["Settings Management"].Terms.View ? (
                  <TermsManagement />
                ) : (
                  <AccessDenied />
                )
              }
            />
            <Route
              path="/settings/privacy"
              element={
                user && privilages["Settings Management"].Privacy.View ? (
                  <PrivacyManagement />
                ) : (
                  <AccessDenied />
                )
              }
            />
            <Route
              path="/settings/faq"
              element={
                user && privilages["Settings Management"].FAQ.View ? (
                  <FAQManagement />
                ) : (
                  <AccessDenied />
                )
              }
            />
          </Route>
        </Route>
        <Route path="/change-password" element={<ChangePassword />} />
        <Route
          path="/forgot-password"
          element={user ? <Navigate to="/dashboard" /> : <ForgotPassword />}
        />
        <Route
          path="/email-verification"
          element={user ? <Navigate to="/dashboard" /> : <EmailVerification />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
