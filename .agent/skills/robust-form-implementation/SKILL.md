---
name: robust-form-implementation
description: Use this skill whenever creating, reviewing, or refactoring forms to ensure reliable validation, submission handling, and user feedback.
---

---

# Goal

Build reliable forms with validation, submission states, error handling, and protection against accidental data loss.

# Instructions

## Form State Management

- Use React Hook Form for form state management.
- Keep forms performant and scalable.
- Minimize unnecessary re-renders.

## Validation

- Define schemas using Zod or Yup.
- Share validation schemas with the backend when possible.
- Validate inputs before submission.

## Error Handling

- Display validation errors directly beneath the corresponding field.
- Use clear and actionable error messages.
- Associate each error with the relevant input.

## Submission States

- Disable submit buttons during submission.
- Display loading indicators while requests are in progress.
- Prevent duplicate submissions.

## User Feedback

- Show success feedback after successful submission.
- Show clear failure feedback when requests fail.
- Communicate current form status.

## Dirty State Protection

- Track unsaved changes.
- Warn users before leaving forms containing unsaved data.
- Protect against accidental data loss.

# Constraints

- Do not use unmanaged form state for complex forms.
- Do not hide validation errors.
- Do not allow duplicate submissions.
- Do not submit invalid data.
- Do not discard unsaved changes without warning.

# Examples

## Input

Create a registration form.

## Output

- React Hook Form manages state.
- Zod validates fields.
- Errors appear beneath inputs.
- Submit button disabled during submission.
- Loading indicator shown.
- Unsaved changes warning enabled.
