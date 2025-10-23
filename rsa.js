// --- RSA KEY PARAMETERS (Simplified for educational purpose) ---
const p = 17; 
const q = 11; 
const N = p * q; // Modulus
const e = 7; // Public Exponent (for encryption)
const d = 23; // Private Exponent (for decryption)

// --- CORE MATHEMATICAL FUNCTION ---
/**
 * Calculates modular exponentiation: (base^exp) mod modulus.
 * Necessary for both encryption and decryption in RSA.
 * @param {number} base
 * @param {number} exp
 * @param {number} modulus
 * @returns {number}
 */
function modPow(base, exp, modulus) {
    let result = 1;
    base = base % modulus;
    while (exp > 0) {
        if (exp % 2 === 1) {
            result = (result * base) % modulus;
        }
        exp = Math.floor(exp / 2);
        base = (base * base) % modulus;
    }
    return result;
}

// --- ENCRYPTION FUNCTION ---

function encryptText() {
    // Get plaintext from the textarea
    const plaintext = document.getElementById('plaintext-input').value; 
    if (!plaintext.trim()) return;

    let ciphertextArray = [];
    
    // Encrypt character by character
    for (let i = 0; i < plaintext.length; i++) {
        const charCode = plaintext.charCodeAt(i);
        // Encryption: C = M^e mod N
        const encryptedChar = modPow(charCode, e, N);
        ciphertextArray.push(encryptedChar);
    }

    const ciphertext = ciphertextArray.join(' ');
    document.getElementById('ciphertext-output').textContent = ciphertext;
    
    // Automatically call decryption after encryption is complete
    decryptText(ciphertext);
}

// --- DECRYPTION FUNCTION ---

function decryptText(ciphertext) {
    // Use the ciphertext passed as argument or retrieve it from the output box
    const textToDecrypt = ciphertext || document.getElementById('ciphertext-output').textContent.trim();
    if (!textToDecrypt) return;

    // Convert the space-separated ciphertext into an array of numbers
    const ciphertextArray = textToDecrypt.split(' ').map(Number);
    
    let decryptedText = '';

    // Decrypt number by number
    for (const encryptedChar of ciphertextArray) {
        // Decryption: M = C^d mod N
        const decryptedCharCode = modPow(encryptedChar, d, N);
        
        // Convert the decrypted ASCII code back to the original character
        decryptedText += String.fromCharCode(decryptedCharCode);
    }

    document.getElementById('decrypted-output').textContent = decryptedText;
}


// --- INITIALIZATION AND CODE DISPLAY ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Automatically start encryption and decryption
    setTimeout(encryptText, 50); 
    
    // 2. Inject the JS code into the HTML display section
    const codeOutput = document.getElementById('rsa-code-output');
    if (codeOutput) {
        // Get the string representation of the functions
        const modPowCode = modPow.toString();
        const encryptCode = encryptText.toString();
        const decryptCode = decryptText.toString();
        
        // Combine all functions for display
        const fullCode = 
`// RSA Constants (Public Key: e, N; Private Key: d, N)
const N = ${N};
const e = ${e}; 
const d = ${d};

// Core function for modular exponentiation: (base^exp) mod modulus
${modPowCode}

// Function to ENCRYPT plaintext (C = M^e mod N)
${encryptCode}

// Function to DECRYPT ciphertext (M = C^d mod N)
${decryptCode}`.trim();
        
        codeOutput.textContent = fullCode;
    }
});