/**
 * Rutas del módulo Institution
 * Define todas las rutas relacionadas con instituciones
 */

import { Route } from "react-router-dom";
import { InstitutionPage } from "../pages/InstitutionPage";
import { InstitutionCreatePage } from "../pages/InstitutionCreatePage";
import { InstitutionDetailPage } from "../pages/InstitutionDetailPage";
import { InstitutionEditPage } from "../pages/InstitutionEditPage";
import { AdminInstitutionPage } from "../pages/AdminInstitutionPage";
import { AdminInstitutionDetailPage } from "../pages/AdminInstitutionDetailPage";
import { DirectorInstitutionPage } from "../pages/DirectorInstitutionPage";
import { DirectorEditInstitutionPage } from "../pages/DirectorEditInstitutionPage";

export const institutionRoutes = (
     <>
          {/* Rutas estándar */}
          <Route path="institucion" element={<InstitutionPage />} />
          <Route
               path="institucion/nuevo"
               element={<InstitutionCreatePage />}
          />
          <Route
               path="institucion/:institutionId"
               element={<InstitutionDetailPage />}
          />
          <Route
               path="institucion/:institutionId/editar"
               element={<InstitutionEditPage />}
          />

          {/* Rutas de administrador */}
          <Route
               path="admin/institucion"
               element={<AdminInstitutionPage />}
          />
          <Route
               path="admin/institucion/:institutionId"
               element={<AdminInstitutionDetailPage />}
          />

          {/* Rutas de director */}
          <Route
               path="director/institucion/:institutionId"
               element={<DirectorInstitutionPage />}
          />
          <Route
               path="director/institucion/:institutionId/editar"
               element={<DirectorEditInstitutionPage />}
          />
     </>
);
