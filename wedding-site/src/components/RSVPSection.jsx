import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import SectionDivider from "./SectionDivider";

const INITIAL_FORM = {
  name: "",
  attending: "",
  dietary: "",
  dj: "",
  message: "",
};

function SuccessMessage({ attending }) {
  return (
    <div className="rsvp__success">
      <div className="rsvp__success-icon">💚</div>
      <h2 className="rsvp__success-title">Tack för ditt svar!</h2>
      <p className="rsvp__success-text">
        Vi har tagit emot din OSA. Vi ser fram emot att fira denna speciella dag
        {attending === "ja" ? " tillsammans med dig" : ""}!
      </p>
    </div>
  );
}

export default function RSVPSection() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleToggle = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const showExtras = form.attending === "ja";

  // Validate: only name, attending, and dj (if attending) are required
  const isValid = (() => {
    if (!form.name.trim() || !form.attending) return false;
    if (form.attending === "ja") return !!form.dj;
    return true;
  })();

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);

    try {
      await addDoc(collection(db, "rsvps"), {
        ...form,
        submittedAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Could not save RSVP:", err);
      alert("Något gick fel. Försök igen!");
    }
    setLoading(false);
  };

  return (
    <section id="osa" className="rsvp">
      <div className="rsvp__inner">
        <p className="section-label">Svara senast 1 juni 2026</p>
        <h2 className="section-title">OSA</h2>

        <SectionDivider />

        {submitted ? (
          <SuccessMessage attending={form.attending} />
        ) : (
          <div className="rsvp__form">
            {/* Name */}
            <div className="rsvp__field">
              <label className="rsvp__label">Namn *</label>
              <input
                type="text"
                className="rsvp__input"
                value={form.name}
                onChange={handleChange("name")}
                placeholder="Ditt fulla namn"
              />
            </div>

            {/* Attending toggle */}
            <div className="rsvp__field">
              <label className="rsvp__label">Kommer du? *</label>
              <div className="rsvp__toggle-group">
                {[
                  { value: "ja", label: "Ja, jag kommer!" },
                  { value: "nej", label: "Tyvärr, jag kan inte" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleToggle("attending", opt.value)}
                    className={`rsvp__toggle ${
                      form.attending === opt.value ? "rsvp__toggle--selected" : ""
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Conditional fields for attending guests */}
            {showExtras && (
              <>
                <div className="rsvp__field">
                  <label className="rsvp__label">Kostpreferens / Allergier</label>
                  <input
                    type="text"
                    className="rsvp__input"
                    value={form.dietary}
                    onChange={handleChange("dietary")}
                    placeholder="T.ex. glutenfritt, vegetariskt, nötallergi..."
                  />
                </div>

                {/* DJ toggle */}
                <div className="rsvp__field">
                  <label className="rsvp__label">Vill du DJ:a? 🎧 *</label>
                  <div className="rsvp__toggle-group">
                    {[
                      { value: "ja", label: "Ja, absolut!" },
                      { value: "nej", label: "Nej tack" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleToggle("dj", opt.value)}
                        className={`rsvp__toggle ${
                          form.dj === opt.value ? "rsvp__toggle--selected" : ""
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

              </>
            )}

            {/* Message */}
            <div className="rsvp__field">
              <label className="rsvp__label">Meddelande till brudparet</label>
              <textarea
                className="rsvp__textarea"
                value={form.message}
                onChange={handleChange("message")}
                placeholder="Skriv en hälsning..."
                rows={4}
              />
            </div>

            {/* Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isValid || loading}
              className="rsvp__submit"
            >
              {loading ? "Skickar..." : "Skicka OSA"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}