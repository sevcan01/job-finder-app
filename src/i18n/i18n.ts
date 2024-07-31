import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      login: "Login",
      signup: "Sign Up",
      logout: "Logout",
      job_listings: "Job Listings",
      apply: "Apply",
      loading: "Loading...",
      error_loading_jobs: "Error loading jobs: {{error}}",
      no_jobs_found: "No jobs found",
      detail: "Detail",
      withdraw: "Withdraw",
      location: "Location",
      salary: "Salary",
      applied_jobs: "Applied Jobs",
      apply_job: "Apply",
      company_name: "Company Name",
      basic_filter: "Basic Filter",
      select_field: "Select a Field",
      job_name: "Job Name",
      search: "Search",
      created_at: "Created At",
      keywords: "Keywords",
      job_description: "Job Description",
      job_list: "Job List",
      best_position_found: "Discover Your Next Career Opportunity",
      intro_message: "Welcome to ACME, the best place to find your dream job. Explore top positions from leading companies.",
      ready_to_get_started: "Ready to get started?",
      footer_message: "Join thousands of others who have found their ideal jobs with us. Whether you're looking for a new challenge or just starting your career, we have something for you.",
      privacy: "Privacy",
      terms: "Terms"
    }
  },
  tr: {
    translation: {
      welcome: "Hoşgeldiniz",
      login: "Giriş Yap",
      signup: "Kayıt Ol",
      logout: "Çıkış Yap",
      job_list: "İş İlanları",
      apply: "Başvur",
      loading: "Yükleniyor...",
      error_loading_jobs: "İşler yüklenirken hata oluştu: {{error}}",
      no_jobs_found: "Hiç iş bulunamadı",
      detail: "Detay",
      withdraw: "Geri Al",
      location: "Konum",
      salary: "Maaş",
      applied_jobs: "Başvurulan İşler",
      apply_job: "Başvur",
      company_name: "Şirket Adı",
      basic_filter: "Filtrele",
      select_field: "Bir Alan Seçin",
      job_name: "İş Adı",
      search: "Ara",
      created_at: " Tarih",
      keywords: "Anahtar Kelimeler",
      job_description: "İş Tanımı",
      best_position_found: "Bir Sonraki Kariyer Fırsatınızı Keşfedin",
      intro_message: "ACME'ye hoş geldiniz, hayalinizdeki işi bulmak için en iyi yer. Önde gelen şirketlerden en iyi pozisyonları keşfedin.",
      ready_to_get_started: "Başlamaya hazır mısınız?",
      footer_message: "Bizimle ideal işlerini bulan binlerce kişiye katıl. Yeni bir meydan okuma arıyorsanız veya kariyerinize yeni başlıyorsanız, sizin için bir şeyimiz var.",
      privacy: "Gizlilik",
      terms: "Şartlar"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
