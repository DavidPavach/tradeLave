import { useState } from 'react';

type FormData = {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    country: string;
    phoneNumber: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialFormData: FormData = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    phoneNumber: '',
};

export const useForm = (initial: FormData = initialFormData) => {

    const [formData, setFormData] = useState<FormData>(initial);
    const [errors, setErrors] = useState<FormErrors>({});

    const update = (k: keyof FormData, v: string) =>
        setFormData(prev => ({ ...prev, [k]: v }));

    const validateUsername = (userName: string): string | null => {
        if (!userName) return 'Username is required';
        if (userName.length <= 5) return 'Username must be more than 5 chars';

        // Allow only letters, numbers and underscores
        const re = /^[A-Za-z0-9_]+$/;
        return re.test(userName) ? null : 'Username can only contain letters, numbers, and underscores';
    };


    const validateEmail = (email: string): string | null => {
        if (!email) return 'Email is required';
        // Basic RFC-5322-ish regex (reasonable default)
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email) ? null : 'Invalid email address';
    };

    const validatePassword = (password: string): string | null => {
        if (!password) return 'Password is required';
        if (password.length < 8) return 'Password must be at least 8 characters';
        if (!/[A-Z]/.test(password)) return 'Password must include an uppercase letter';
        if (!/[a-z]/.test(password)) return 'Password must include a lowercase letter';
        if (!/[0-9]/.test(password)) return 'Password must include a digit';
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Password must include a special character';
        return null;
    };

    const validateConfirmPassword = (pwd: string, confirm: string): string | null =>
        pwd === confirm ? null : 'Passwords do not match';

    const validatePhone = (phoneNumber: string): string | null => {
        if (!phoneNumber) return null; // optional: remove if required
        // Basic international-ish validation: digits, spaces, +, -, parentheses
        const cleaned = phoneNumber.replace(/[ \-().]/g, '');
        if (!/^\+?\d{7,15}$/.test(cleaned)) return 'Invalid phoneNumber number';
        return null;
    };

    const validateCountry = (country: string): string | null =>
        country ? null : 'Country is required';

    const validateAll = (): boolean => {
        const e: FormErrors = {};

        const usernameErr = validateUsername(formData.userName)
        if (usernameErr) e.userName = usernameErr;

        const emailErr = validateEmail(formData.email);
        if (emailErr) e.email = emailErr;

        const pwdErr = validatePassword(formData.password);
        if (pwdErr) e.password = pwdErr;

        const confirmErr = validateConfirmPassword(formData.password, formData.confirmPassword);
        if (confirmErr) e.confirmPassword = confirmErr;

        const countryErr = validateCountry(formData.country);
        if (countryErr) e.country = countryErr;

        const phoneErr = validatePhone(formData.phoneNumber);
        if (phoneErr) e.phoneNumber = phoneErr;

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const reset = (to: FormData = initialFormData) => {
        setFormData(to);
        setErrors({});
    };

    return {
        formData,
        errors,
        update,
        validateAll,
        validateField: (k: keyof FormData) => {
            let message: string | null = null;
            switch (k) {
                case 'userName':
                    message = validateUsername(formData.userName);
                    break;
                case 'email':
                    message = validateEmail(formData.email);
                    break;
                case 'password':
                    message = validatePassword(formData.password);
                    break;
                case 'confirmPassword':
                    message = validateConfirmPassword(formData.password, formData.confirmPassword);
                    break;
                case 'country':
                    message = validateCountry(formData.country);
                    break;
                case 'phoneNumber':
                    message = validatePhone(formData.phoneNumber);
                    break;
            }
            setErrors(prev => ({ ...prev, [k]: message || undefined }));
            return message;
        },
        reset,
    };
};

// Helper to format current date/time like "11:07 am 19 November 2025 UTC"
export const formatNowWithTimezoneLabel = (tz: string): string => {
    const timezone = tz || 'UTC';
    const now = new Date();

    const timeOpts: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: timezone,
    };
    const dateOpts: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        timeZone: timezone,
    };

    const formattedTime = new Intl.DateTimeFormat('en-GB', timeOpts).format(now).toLowerCase();
    const formattedDate = new Intl.DateTimeFormat('en-GB', dateOpts).format(now);

    const tzLabel = timezone === 'UTC' ? 'UTC' : timezone.split('/').pop()?.replace('_', ' ') ?? timezone;
    return `${formattedTime} ${formattedDate} ${tzLabel}`;
};
