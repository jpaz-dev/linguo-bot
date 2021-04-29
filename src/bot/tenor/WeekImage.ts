export interface WeekImage {
	title: string;
	url: string;
}

export enum WeekDay {
	Monday,
	Tuesday,
	Wednesday,
	Thursday,
	Friday,
	Saturday,
	Sunday
}

export function getGreetingImage(weekDay: WeekDay): WeekImage {
	switch (weekDay) {
		case WeekDay.Monday: {
			return {
				title: "¡Feliz Lunes!",
				url: "https://i.pinimg.com/564x/42/9f/cb/429fcbe3113e48470d19cb7d2fe0f2f3.jpg",
			}
		};
		case WeekDay.Tuesday: {
			return {
				title: "¡Feliz Martes!",
				url: "https://i1.sndcdn.com/artworks-i6byTPk1divVvYKI-A0Dk0w-t500x500.jpg",
			}
		}
		case WeekDay.Wednesday: {
			return {
				title: "¡Feliz Miercoles!",
				url: "https://media1.tenor.com/images/cfeb7a77e287d674d56d4706dcaeab1c/tenor.gif?itemid=5446149",
			}
		}
		case WeekDay.Thursday: {
			return {
				title: "¡Feliz Jueves!",
				url: "https://media1.tenor.com/images/4ef3cd6e461ffec35864378131dde05c/tenor.gif?itemid=16469364",
			}
		}
		case WeekDay.Friday: {
			return {
				title: "¡Feliz Viernes!",
				url: "https://media1.tenor.com/images/38a105a92f5f44aba28012c8466ab75a/tenor.gif?itemid=13625565",
			}
		}
	}
}

export function getFarewellImage(weekDay: WeekDay): WeekImage {
	switch (weekDay) {
		case WeekDay.Monday: {
			return {
				title: "¡Feliz Lunes!",
				url: "https://i.pinimg.com/564x/42/9f/cb/429fcbe3113e48470d19cb7d2fe0f2f3.jpg",
			}
		};
		case WeekDay.Tuesday: {
			return {
				title: "¡Feliz Martes!",
				url: "https://i1.sndcdn.com/artworks-i6byTPk1divVvYKI-A0Dk0w-t500x500.jpg",
			}
		}
		case WeekDay.Wednesday: {
			return {
				title: "¡Feliz Miercoles!",
				url: "https://media1.tenor.com/images/cfeb7a77e287d674d56d4706dcaeab1c/tenor.gif?itemid=5446149",
			}
		}
		case WeekDay.Thursday: {
			return {
				title: "¡Feliz Jueves!",
				url: "https://media1.tenor.com/images/4ef3cd6e461ffec35864378131dde05c/tenor.gif?itemid=16469364",
			}
		}
		case WeekDay.Friday: {
			return {
				title: "¡Feliz Viernes!",
				url: "https://media1.tenor.com/images/38a105a92f5f44aba28012c8466ab75a/tenor.gif?itemid=13625565",
			}
		}
	}
}
