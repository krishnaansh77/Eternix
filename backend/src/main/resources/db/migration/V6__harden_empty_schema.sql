ALTER TABLE users
    ADD CONSTRAINT users_name_length CHECK (char_length(trim(name)) BETWEEN 2 AND 200),
    ADD CONSTRAINT users_email_length CHECK (char_length(email) BETWEEN 3 AND 320);

ALTER TABLE patients
    ADD CONSTRAINT patients_gender_length CHECK (gender IS NULL OR char_length(gender) <= 32);

ALTER TABLE doctors
    ADD CONSTRAINT doctors_license_unique UNIQUE (license_identifier);

ALTER TABLE patient_reports
    ADD CONSTRAINT patient_reports_file_name_length CHECK (char_length(trim(original_file_name)) BETWEEN 1 AND 500);

ALTER TABLE cbc_reports
    ADD CONSTRAINT cbc_reports_source_length CHECK (char_length(trim(source)) BETWEEN 1 AND 64);

CREATE INDEX patient_reports_reviewed_by_idx ON patient_reports (reviewed_by_doctor_id);
CREATE INDEX cbc_reports_patient_submitted_idx ON cbc_reports (patient_id, submitted_by);

COMMENT ON SCHEMA public IS 'Aarogyam application schema. Migrations create structure only; no demo or seed records are inserted.';
COMMENT ON TABLE users IS 'Application users. New local databases intentionally start empty.';
COMMENT ON TABLE patient_reports IS 'Reports owned by patient user accounts; access is enforced in the service layer.';
COMMENT ON TABLE cbc_reports IS 'CBC submissions linked to the patient profile and submitting user.';
