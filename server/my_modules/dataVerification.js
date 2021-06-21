const ismail = require("ismail");

const dataVerificator = (type, mod = 'hard', data) => {
	switch (type) {
		case 'password':
			switch (mod) {
				case 'hard':
					if (data.length >= 12 && data.length <= 32 
						&& /[0-9]/.test(data) 
						&& /[A-z]/.test(data) 
						&& /[a-z]/.test(data) 
						&& /[!#%^&*+]/.test(data)
						&& !/[<>${}()]/.test(data))
						return (true);
					else
						return (false);
					break;
				case 'medium':
					if (data.length >= 8 && data.length <= 16 
						&& /[0-9]/.test(data) 
						&& /[A-z]/.test(data) 
						&& /[a-z]/.test(data))
						return (true);
					else
						return (false);
					break;
				case 'easy':
					if (data.length >= 4 && data.length <= 16 
						&& /[A-z]/.test(data) 
						&& /[a-z]/.test(data))
						return (true);
					else
						return (false);
					break;
			}
			break;
		case 'mail':
			switch (mod) {
				case 'hard':
				case 'medium':
				case 'easy':
				if (ismail(data).valid)
					return (true);
				else
					return (false);
				break;
			}
			break;
	}
}

module.exports = dataVerificator;