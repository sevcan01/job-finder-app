import React from "react";
import Modal from "react-modal";
import CustomButton from "../CustomButton";
import { Job } from "../../api/job";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useAuthStore, useJobStore } from "../../stores/authStore";

interface DetailModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  job: Job;
  handleApply: (job: Job, onRequestClose: () => void) => Promise<void>;
}

const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onRequestClose,
  job,
  handleApply,
}) => {
  const { t } = useTranslation();
  const { email } = useAuthStore();
  const { isApplying, setIsApplying } = useJobStore();

  const applyForJob = async () => {
    setIsApplying(true);
    try {
      await handleApply(job, onRequestClose);
      toast.dark(t("application_successful"), { autoClose: 1000 });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "already_applied") {
          toast.error(t("you_have_already_applied"), { autoClose: 1000 });
        } else {
          toast.error(t("application_failed"), { autoClose: 1000 });
        }
      } else {
        toast.error(t("application_failed"), { autoClose: 1000 });
      }
    } finally {
      setIsApplying(false);
    }
  };

  if (!email) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={"job_detail_modal"}
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 z-40"
    >
      <div className="bg-white p-8 rounded shadow-md max-w-sm w-full relative">
        {/* <button onClick={onRequestClose} className="absolute top-4 right-4 text-black text-2xl font-bold">
          <img src="/path-to-close-icon.svg" width={25} alt={t('close')} />
        </button> */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          {t("apply_job")}
        </h2>
        <div className="space-y-1">
          <p>
            <strong>{t("company")}:</strong> {job.companyName}
          </p>
          <p>
            <strong>{t("job_name")}:</strong> {job.name}
          </p>
          <p>
            <strong>{t("created_at")}:</strong>{" "}
            {new Date(job.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>{t("location")}:</strong> {job.location}
          </p>
          <div className="flex">
            <span>
              <strong>{t("keywords")}:</strong>
            </span>
          </div>
          <div className="flex gap-4">
            {job.keywords.slice(0, 3).map((keyword, index) => (
              <button key={index} className="border p-1">
                {keyword}
              </button>
            ))}
          </div>
          <p>
            <strong>{t("salary")}:</strong> {job.salary}
          </p>
          <h1>
            <strong>{t("job_description")}</strong>
          </h1>
          <div className="p-3 border border-black">
            <p>{job.description}</p>
          </div>
          <div className="flex gap-5 justify-center p-2">
            <CustomButton
              label={t("close")}
              onClick={onRequestClose}
              buttonColor="white"
              textColor="black"
              width="25%"
            />
            <CustomButton
              label={t("apply")}
              onClick={applyForJob}
              buttonColor="black"
              textColor="white"
              width="25%"
              disabled={isApplying}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DetailModal;
