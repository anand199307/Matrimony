export interface FormData {
  title: string;
  textas?: string;
  content: {
    name?: string;
    namevalues?: string;
    type: string;
    placeholder?: string;
    rules: {
      required: boolean;
      message: string;
    }[];
  }[];
}

export const Datas: FormData[] = [
  {
    title: 'Create New Plan',
    textas: 'Lorem ipsum dolor sit amet consectetur.',
    content: [
      {
        name: 'Plan name',
        namevalues: 'name',
        type: 'input',
        placeholder: 'Enter plan name',
        rules: [
          {
            required: true,
            message: 'Please enter plan name',
          },
        ],
      },
      {
        name: 'Plan Duration ',
        namevalues: 'durationInMonths',
        type: 'input',
        placeholder: 'Enter plan duration',
        rules: [
          {
            required: true,
            message: 'Please enter plan duration',
          },
        ],
      },
      {
        name: 'Plan Amount',
        type: 'input',
        namevalues: 'price',
        placeholder: 'Enter plan amount',
        rules: [
          {
            required: true,
            message: 'Please enter plan amount',
          },
        ],
      },
      {
        name: 'No. of contacts',
        namevalues: 'contactLimit',
        type: 'input',
        placeholder: ' enter contacts',
        rules: [
          {
            required: true,
            message: 'Please enter contacts',
          },
        ],
      },
    ],
  },
];

export const offertext = [
  {
    id: 1,
    text: 'Send Unlimited Messages',
  },
  {
    id: 2,
    text: 'View upto 75 Contact Numbers',
  },
  {
    id: 3,
    text: 'Standout from other profiles',
  },
  {
    id: 4,
    text: 'Let matches contact you directly',
  },
];

// export default PlanFunctionality;
