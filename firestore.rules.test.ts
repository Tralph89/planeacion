// Phase 0 Security Test Suite for /courses/{courseId}
export const dirtyDozenPayloads = [
  { name: "1. Unauthenticated Write", auth: null, expected: "PERMISSION_DENIED" },
  { name: "2. Unverified Email Write", auth: { uid: "u1", email_verified: false }, expected: "PERMISSION_DENIED" },
  { name: "3. Identity Spoofing on Create", auth: { uid: "u1", email_verified: true }, data: { ownerId: "u2" }, expected: "PERMISSION_DENIED" },
  { name: "4. Path/Payload ID Mismatch", path: "/courses/c1", data: { courseId: "c2" }, expected: "PERMISSION_DENIED" },
  { name: "5. ID Poisoning Attack", path: "/courses/bad$id!", expected: "PERMISSION_DENIED" },
  { name: "6. Shadow Field on Create", data: { ghostField: true }, expected: "PERMISSION_DENIED" },
  { name: "7. Shadow Field on Update", update: { ghostField: true }, expected: "PERMISSION_DENIED" },
  { name: "8. Ownership Transfer on Update", update: { ownerId: "u2" }, expected: "PERMISSION_DENIED" },
  { name: "9. Immutable createdAt Tampering", update: { createdAt: "2020-01-01T00:00:00Z" }, expected: "PERMISSION_DENIED" },
  { name: "10. Forged updatedAt Timestamp", update: { updatedAt: "2099-01-01T00:00:00Z" }, expected: "PERMISSION_DENIED" },
  { name: "11. Oversized String Value Poisoning", update: { nombreCurso: "A".repeat(1000) }, expected: "PERMISSION_DENIED" },
  { name: "12. Cross-Tenant Read/List/Delete", auth: { uid: "u2", email_verified: true }, targetOwner: "u1", expected: "PERMISSION_DENIED" }
];
