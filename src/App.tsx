import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { HomePage } from "@/pages/HomePage";
import { IpPage } from "@/pages/IpPage";
import { Base64ToImagePage } from "@/pages/Base64ToImagePage";
import { ImageToBase64Page } from "@/pages/ImageToBase64Page";
import { CpfPage } from "@/pages/CpfPage";
import { CnpjPage } from "@/pages/CnpjPage";
import { DnsPropagationPage } from "@/pages/DnsPropagationPage";
import { JsonFormatterPage } from "@/pages/JsonFormatterPage";
import { JwtDecoderPage } from "@/pages/JwtDecoderPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ferramentas/qual-meu-ip" element={<IpPage />} />
        <Route
          path="/ferramentas/image-base64"
          element={<Base64ToImagePage />}
        />
        <Route path="/ferramentas/cpf" element={<CpfPage />} />
        <Route path="/ferramentas/cnpj" element={<CnpjPage />} />
        <Route
          path="/ferramentas/dns-propagacao"
          element={<DnsPropagationPage />}
        />
        <Route
          path="/ferramentas/formatador-json"
          element={<JsonFormatterPage />}
        />
        <Route
          path="/ferramentas/decodificador-jwt"
          element={<JwtDecoderPage />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
