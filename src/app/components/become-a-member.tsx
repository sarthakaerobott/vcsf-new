import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, Loader2 } from "lucide-react";

interface BecomeMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby88K9vw3wm6ChJqlC2civx0csRCFuK8aPpy6Gi4bm15ouULFCfqWyFYjBgdkGDk5gJnA/exec";

const MEMBER_TYPES = [
  { id: "promoter", label: "Promoter Member", amount: "12,00,000" },
  { id: "co-promoter", label: "Co Promoter Member", amount: "6,00,000" },
  { id: "chief-patron", label: "Chief Patron Member", amount: "2,51,000" },
  { id: "patron", label: "Patron Member", amount: "1,51,000" },
  { id: "general", label: "General Member", amount: "5,000" },
];

const QUALIFICATIONS = [
  "Below 10th", "10th Pass", "12th Pass", "Graduate", "Post Graduate",
  "Doctorate", "Professional Degree", "Other",
];

const WORK_CATEGORIES = [
  "Business", "Service", "Professional", "Agriculture", "Industry",
  "Trade", "Self Employed", "Other",
];

const VAISH_GHATAK = [
  "Agarwal", "Gupta", "Bansal", "Garg", "Goyal", "Jindal",
  "Khandelwal", "Maheshwari", "Mittal", "Singhal", "Other",
];

type SubmitStatus = "idle" | "loading" | "success" | "error";

// Converts a File to a base64 string (strips the data URL prefix)
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]); // strip "data:image/png;base64,"
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export function BecomeMemberModal({ isOpen, onClose }: BecomeMemberModalProps) {
  const [memberType, setMemberType] = useState("promoter");
  const [gender, setGender] = useState("male");
  const [maritalStatus, setMaritalStatus] = useState("married");
  const [agreed, setAgreed] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const [form, setForm] = useState({
    name: "",
    fathersName: "",
    qualification: "",
    workCategory: "",
    designation: "",
    firmName: "",
    spouseName: "",
    vaishGhatak: "",
    gotra: "",
    dob: "",
    dateOfMarriage: "",
    spouseDob: "",
    panCard: "",
    pinCode: "",
    place: "",
    district: "",
    state: "",
    houseNumber: "",
    buildingArea: "",
    mobileNo: "",
    phoneStd: "",
    email: "",
    referenceName: "CHARU GUPTA",
    referencePhone: "9829910090",
    photo: null as File | null,
    aadhar: null as File | null,
  });

  const contribution = MEMBER_TYPES.find((m) => m.id === memberType)?.amount || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "photo" | "aadhar"
  ) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, [field]: file });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return alert("Please agree to the terms.");

    setSubmitStatus("loading");

    try {
      // Convert files to base64 in parallel
      const [photoBase64, aadharBase64] = await Promise.all([
        form.photo ? fileToBase64(form.photo) : Promise.resolve(""),
        form.aadhar ? fileToBase64(form.aadhar) : Promise.resolve(""),
      ]);

      // IST timestamp generated on the client
      const submissionTime = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      const payload = {
        submissionTime,
        memberType,
        contributionAmount: contribution,
        gender,
        maritalStatus,
        name: form.name,
        fathersName: form.fathersName,
        qualification: form.qualification,
        workCategory: form.workCategory,
        designation: form.designation,
        firmName: form.firmName,
        spouseName: form.spouseName,
        vaishGhatak: form.vaishGhatak,
        gotra: form.gotra,
        dob: form.dob,
        dateOfMarriage: form.dateOfMarriage,
        spouseDob: form.spouseDob,
        panCard: form.panCard,
        pinCode: form.pinCode,
        place: form.place,
        district: form.district,
        state: form.state,
        houseNumber: form.houseNumber,
        buildingArea: form.buildingArea,
        mobileNo: form.mobileNo,
        phoneStd: form.phoneStd,
        email: form.email,
        referenceName: form.referenceName,
        referencePhone: form.referencePhone,
        // File payloads — saved to Google Drive by Apps Script
        photoBase64,
        photoFileName: form.photo?.name || "",
        photoMimeType: form.photo?.type || "",
        aadharBase64,
        aadharFileName: form.aadhar?.name || "",
        aadharMimeType: form.aadhar?.type || "",
      };

      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Required for Apps Script; response will be opaque
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setSubmitStatus("success");
      setTimeout(() => {
        setSubmitStatus("idle");
        onClose();
      }, 2500);
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  const inputCls =
    "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-sm transition-all bg-white";
  const labelCls = "block text-[#0F2C59] text-sm mb-1.5 font-semibold";
  const sectionHeadingCls =
    "text-[#0F2C59] text-base font-bold mb-4 mt-6 pb-1 border-b border-[#D4AF37]/40";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#0F2C59] text-white px-6 py-4 rounded-t-2xl flex items-start justify-between z-10">
              <div>
                <h2 className="text-xl font-bold">JOIN US — Online Membership</h2>
                <p className="text-white/70 text-sm mt-0.5">
                  Membership Benefits &nbsp;|&nbsp; IVF Membership / Donation
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors mt-0.5 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Success overlay */}
            <AnimatePresence>
              {submitStatus === "success" && (
                <motion.div
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/97 rounded-2xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-[#0F2C59] mb-2">
                    Registration Successful!
                  </h3>
                  <p className="text-gray-500 text-sm text-center px-8">
                    Your details and documents have been saved. We'll be in touch soon.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="px-6 pb-6">
              <p className="text-sm text-gray-500 mt-4 mb-4">
                All the <span className="text-red-500 font-semibold">*</span> marked fields are
                mandatory.
              </p>

              {/* Member Type */}
              <div className={sectionHeadingCls}>I wish to enroll myself as *</div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                {MEMBER_TYPES.map((m) => (
                  <label
                    key={m.id}
                    className="flex items-center gap-2 cursor-pointer text-sm text-gray-700"
                  >
                    <input
                      type="radio"
                      name="memberType"
                      value={m.id}
                      checked={memberType === m.id}
                      onChange={() => setMemberType(m.id)}
                      className="accent-[#0F2C59]"
                    />
                    <span className="uppercase font-semibold text-xs">{m.label}</span>
                  </label>
                ))}
              </div>

              {/* Contribution */}
              <div className={sectionHeadingCls}>Contribution Details</div>
              <div>
                <label className={labelCls}>Contribution Amount (₹)</label>
                <input
                  type="text"
                  value={contribution}
                  readOnly
                  className={`${inputCls} bg-gray-50 cursor-not-allowed font-semibold`}
                />
              </div>

              {/* Personal Details */}
              <div className={sectionHeadingCls}>Personal Details</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Name <span className="text-red-500">*</span></label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name *" className={inputCls} required />
                </div>
                <div>
                  <label className={labelCls}>Father's Name <span className="text-red-500">*</span></label>
                  <input type="text" name="fathersName" value={form.fathersName} onChange={handleChange} placeholder="Father's Name *" className={inputCls} required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className={labelCls}>Gender <span className="text-red-500">*</span></label>
                  <div className="flex gap-6 mt-1">
                    {["male", "female"].map((g) => (
                      <label key={g} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                        <input type="radio" name="gender" value={g} checked={gender === g} onChange={() => setGender(g)} className="accent-[#0F2C59]" />
                        <span className="capitalize">{g}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Marital Status <span className="text-red-500">*</span></label>
                  <div className="flex gap-4 mt-1 flex-wrap">
                    {["married", "unmarried", "prefer not to say"].map((s) => (
                      <label key={s} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                        <input type="radio" name="maritalStatus" value={s} checked={maritalStatus === s} onChange={() => setMaritalStatus(s)} className="accent-[#0F2C59]" />
                        <span className="capitalize">{s}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className={labelCls}>Qualification / Education</label>
                  <select name="qualification" value={form.qualification} onChange={handleChange} className={inputCls}>
                    <option value="">Select Qualification / Education</option>
                    {QUALIFICATIONS.map((q) => <option key={q}>{q}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Work Category</label>
                  <select name="workCategory" value={form.workCategory} onChange={handleChange} className={inputCls}>
                    <option value="">Select Work Category</option>
                    {WORK_CATEGORIES.map((w) => <option key={w}>{w}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className={labelCls}>Designation</label>
                  <input type="text" name="designation" value={form.designation} onChange={handleChange} placeholder="Designation" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Firm / Company Name</label>
                  <input type="text" name="firmName" value={form.firmName} onChange={handleChange} placeholder="Firm/Company Name" className={inputCls} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className={labelCls}>Name of Husband/Wife (Spouse) <span className="text-red-500">*</span></label>
                  <input type="text" name="spouseName" value={form.spouseName} onChange={handleChange} placeholder="Name of Husband/Wife (Spouse)*" className={inputCls} required />
                </div>
                <div>
                  <label className={labelCls}>Vaish Ghatak</label>
                  <select name="vaishGhatak" value={form.vaishGhatak} onChange={handleChange} className={inputCls}>
                    <option value="">Select Vaish Ghatak</option>
                    {VAISH_GHATAK.map((v) => <option key={v}>{v}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className={labelCls}>Gotra</label>
                  <input type="text" name="gotra" value={form.gotra} onChange={handleChange} placeholder="Gotra" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Date Of Birth <span className="text-red-500">*</span></label>
                  <input type="text" name="dob" value={form.dob} onChange={handleChange} placeholder="DD/MM/YYYY *" className={inputCls} required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className={labelCls}>Date Of Marriage</label>
                  <input type="text" name="dateOfMarriage" value={form.dateOfMarriage} onChange={handleChange} placeholder="DD/MM/YYYY" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Spouse Date of Birth</label>
                  <input type="text" name="spouseDob" value={form.spouseDob} onChange={handleChange} placeholder="DD/MM/YYYY" className={inputCls} />
                </div>
              </div>

              <div className="mt-4">
                <label className={labelCls}>PAN Card</label>
                <input type="text" name="panCard" value={form.panCard} onChange={handleChange} placeholder="Enter PAN Card to get 80G certificate" className={inputCls} />
              </div>

              {/* Address */}
              <div className={sectionHeadingCls}>Address</div>
              <div className="mb-4">
                <input type="text" value="INDIA" readOnly className={`${inputCls} bg-gray-50 cursor-not-allowed font-semibold`} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Pin Code <span className="text-red-500">*</span></label>
                  <input type="text" name="pinCode" value={form.pinCode} onChange={handleChange} placeholder="Pin Code *" className={inputCls} required />
                </div>
                <div>
                  <label className={labelCls}>Place <span className="text-red-500">*</span></label>
                  <input type="text" name="place" value={form.place} onChange={handleChange} placeholder="Place *" className={inputCls} required />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className={labelCls}>District <span className="text-red-500">*</span></label>
                  <input type="text" name="district" value={form.district} onChange={handleChange} placeholder="District *" className={inputCls} required />
                </div>
                <div>
                  <label className={labelCls}>State <span className="text-red-500">*</span></label>
                  <input type="text" name="state" value={form.state} onChange={handleChange} placeholder="State *" className={inputCls} required />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className={labelCls}>House Number <span className="text-red-500">*</span></label>
                  <input type="text" name="houseNumber" value={form.houseNumber} onChange={handleChange} placeholder="House Number *" className={inputCls} required />
                </div>
                <div>
                  <label className={labelCls}>Building Name / Lane / Road / Area <span className="text-red-500">*</span></label>
                  <input type="text" name="buildingArea" value={form.buildingArea} onChange={handleChange} placeholder="Building Name / Lane / Road / Area*" className={inputCls} required />
                </div>
              </div>

              {/* Contact Details */}
              <div className={sectionHeadingCls}>Contact Details</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Mobile No <span className="text-red-500">*</span></label>
                  <input type="tel" name="mobileNo" value={form.mobileNo} onChange={handleChange} placeholder="Mobile No *" className={inputCls} required />
                </div>
                <div>
                  <label className={labelCls}>Phone No with STD Code</label>
                  <input type="tel" name="phoneStd" value={form.phoneStd} onChange={handleChange} placeholder="Phone No with STD Code" className={inputCls} />
                </div>
              </div>
              <div className="mt-4">
                <label className={labelCls}>E-mail ID</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="E-mail ID" className={inputCls} />
              </div>

              {/* Attachments */}
              <div className={sectionHeadingCls}>Attachment</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Upload Your Photo <span className="text-red-500">*</span></label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "photo")}
                    className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#0F2C59] file:text-white hover:file:bg-[#082040] cursor-pointer"
                  />
                  {form.photo && (
                    <p className="text-xs text-green-600 mt-1.5">✓ {form.photo.name}</p>
                  )}
                </div>
                <div>
                  <label className={labelCls}>Upload Your Aadhar Card <span className="text-red-500">*</span></label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, "aadhar")}
                    className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#0F2C59] file:text-white hover:file:bg-[#082040] cursor-pointer"
                  />
                  {form.aadhar && (
                    <p className="text-xs text-green-600 mt-1.5">✓ {form.aadhar.name}</p>
                  )}
                </div>
              </div>

              {/* Agreement */}
              <div className="mt-6 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 accent-[#0F2C59] w-4 h-4 flex-shrink-0"
                />
                <label htmlFor="agree" className="text-sm text-gray-600 cursor-pointer">
                  I agree to be abide with the rules and objects of the mahasammelan and assure you
                  my full and sincere co-operation in achieving the goal set out by the Federation
                </label>
              </div>

              {submitStatus === "error" && (
                <p className="mt-3 text-sm text-red-500 text-center">
                  Submission failed. Please check your connection and try again.
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitStatus === "loading"}
                className="mt-6 w-full py-3 bg-[#D4AF37] text-[#0F2C59] rounded-xl font-bold text-sm hover:bg-[#E5C158] transition-colors shadow-lg hover:shadow-xl tracking-wide uppercase disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitStatus === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading & Submitting...
                  </>
                ) : (
                  "Register Yourself"
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}