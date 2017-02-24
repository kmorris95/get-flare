export let emailRegex = new RegExp(/\b[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/);
export let phoneNumberRegex = new RegExp(/^\d{10,11}$/);
export let passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/);
