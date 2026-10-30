# Security Specification (`security_spec.md`)

## 1. Data Invariants
1. **Strict Ownership (`ownerId`)**: Every document in `/courses/{courseId}` belongs exclusively to the authenticated user whose `request.auth.uid == resource.data.ownerId`.
2. **Verified Identity**: All writes (`create`, `update`, `delete`) require a signed-in user with `request.auth.token.email_verified == true`.
3. **Path & Document ID Integrity**: The path parameter `{courseId}` must match `^[a-zA-Z0-9_\-]+$`, be `<= 128` characters, and match `request.resource.data.courseId`.
4. **Immutable Fields**: `courseId`, `ownerId`, and `createdAt` cannot be modified after creation.
5. **Temporal Integrity**: On `create`, `createdAt == request.time && updatedAt == request.time`. On `update`, `updatedAt == request.time`.
6. **Query Enforcer**: `allow list` on `/courses/{courseId}` strictly checks `isSignedIn() && resource.data.ownerId == request.auth.uid` so no user can list another teacher's courses.

## 2. The "Dirty Dozen" Payloads
1. **Unauthenticated Write**: `auth = null`, creating `/courses/c1` -> `PERMISSION_DENIED`.
2. **Unverified Email Write**: `auth = { uid: 'u1', token: { email_verified: false } }`, creating `/courses/c1` -> `PERMISSION_DENIED`.
3. **Identity Spoofing on Create**: `auth.uid = 'u1'`, payload `ownerId: 'u2'` -> `PERMISSION_DENIED`.
4. **Path/Payload ID Mismatch**: Path `/courses/c1`, payload `courseId: 'c2'` -> `PERMISSION_DENIED`.
5. **ID Poisoning Attack**: Path `/courses/invalid$id!@#` -> `PERMISSION_DENIED`.
6. **Shadow Field Injection on Create**: Payload includes extra field `isAdmin: true` -> `PERMISSION_DENIED`.
7. **Shadow Field Injection on Update**: Update payload includes undeclared key `hacked: 'yes'` -> `PERMISSION_DENIED`.
8. **Ownership Transfer Attempt on Update**: Updating `ownerId` from `'u1'` to `'u2'` -> `PERMISSION_DENIED`.
9. **Immutable Timestamp Tampering**: Updating `createdAt` to a new timestamp -> `PERMISSION_DENIED`.
10. **Forged Client `updatedAt` Timestamp**: Updating `updatedAt` with a past/future timestamp instead of `request.time` -> `PERMISSION_DENIED`.
11. **Value Poisoning (Oversized String)**: Setting `nombreCurso` to a 5000-character string (`> 240`) -> `PERMISSION_DENIED`.
12. **Cross-Tenant Read/List/Delete**: Authenticated user `'u2'` reading, listing, or deleting a course where `ownerId == 'u1'` -> `PERMISSION_DENIED`.
