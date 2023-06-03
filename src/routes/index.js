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
} from "../pages";
import { AppContext } from "../context";
import { AdminLayout } from "../components";

const Router = () => {
  const { user } = useContext(AppContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={user ? <AdminLayout /> : <Navigate to="/login" />}
        >
          <Route index path="/dashboard" element={<Dashboard />} />
          <Route path="/users-management" element={<UsersManagement />} />
          <Route path="/promotion-management">
            <Route
              path="/promotion-management/banner"
              element={<BannerPromotion />}
            />
            <Route
              path="/promotion-management/popup"
              element={<PopupPromotion />}
            />
          </Route>
          <Route path="/access">
            {/* <Route path="/access/privileges" element={<Privileges />} /> */}
            <Route path="/access/sub-admin" element={<SubAdmin />} />
            <Route path="/access/roles" element={<Roles />} />
          </Route>
          <Route path="/books-management" element={<BooksManagement />} />
          <Route path="/publish-book" element={<PublishBook />} />
          <Route path="/parish-management" element={<ParishManagement />} />
          <Route path="/events-management" element={<EventsManagement />} />
          <Route path="/feedback-management" element={<FeedbackManagement />} />
          <Route path="/contact-management" element={<ContactManagement />} />
          <Route path="/settings">
            <Route path="/settings/admin-email" element={<AdminEmail />} />
            <Route path="/settings/region" element={<RegionsManagement />} />
            <Route
              path="/settings/province"
              element={<ProvincesManagement />}
            />
            <Route
              path="/settings/book-category"
              element={<BookCategoriesManagement />}
            />
            <Route
              path="/settings/book-language"
              element={<BookLanguagesManagement />}
            />
            <Route path="/settings/about-rccg" element={<AboutRCCG />} />
            <Route
              path="/settings/about-rccg-structure"
              element={<RCCGStructure />}
            />
            <Route
              path="/settings/about-rccg-continent2"
              element={<RCCGContinent2 />}
            />
            <Route path="/settings/about-kirista" element={<AboutKirista />} />
            <Route path="/settings/terms" element={<TermsManagement />} />
            <Route path="/settings/privacy" element={<PrivacyManagement />} />
            <Route path="/settings/faq" element={<FAQManagement />} />
          </Route>
        </Route>
        <Route path="/change-password/:email" element={<ChangePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/email-verification/:email"
          element={<EmailVerification />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
