'use client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from '../../components/ui/Table';

dayjs.extend(relativeTime);

export default function BeanInfo() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const beanBenefits = [
    'Rich in Protein: Beans are an excellent plant-based protein source, making them a great option for vegetarians and vegans.',
    'High in Fiber: Beans help improve digestion and maintain a healthy gut.',
    'Heart-Healthy: Packed with antioxidants and nutrients, beans support heart health by reducing cholesterol and stabilizing blood sugar levels.',
    'Rich in Vitamins and Minerals: Beans contain important nutrients like iron, folate, and potassium, supporting overall health.',
    'Low in Fat: Beans are naturally low in fat, making them a great addition to a healthy diet.',
  ];

  const beanNutritionFacts = [
    { name: 'Calories', value: '220 kcal' },
    { name: 'Protein', value: '15 g' },
    { name: 'Fiber', value: '9 g' },
    { name: 'Fat', value: '0.9 g' },
    { name: 'Carbohydrates', value: '40 g' },
    { name: 'Iron', value: '2.5 mg' },
    { name: 'Potassium', value: '400 mg' },
    { name: 'Folate', value: '240 mcg' },
  ];

  const beanUses = [
    'Bean Soup: A hearty and nutritious meal perfect for colder weather.',
    'Salads: Beans can be added to salads for a boost of protein and fiber.',
    'Veggie Burgers: Blend beans with vegetables and spices for a delicious vegetarian burger.',
    'Chili: A rich and flavorful dish that’s easy to make and packed with nutrients.',
    'Smoothies: Beans can be blended into smoothies for added creaminess and protein.',
  ];

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-8">
        <h2 className="text-3xl font-bold text-gray-900">Benefits of Beans</h2>
        <p className="text-lg text-gray-700">
          Beans are one of the most nutritious and versatile foods available. Whether you’re looking to improve your health or add variety to your meals, beans offer a wide range of benefits:
        </p>

        <ul className="list-disc pl-6 space-y-4 text-gray-700">
          {beanBenefits.map((benefit, index) => (
            <li key={index} className="text-lg">
              {benefit}
            </li>
          ))}
        </ul>

        <h3 className="text-2xl font-bold text-gray-900">Bean Nutrition Facts</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCaption className="font-semibold text-lg pb-3">Nutritional Information</TableCaption>
            </TableRow>
          </TableHeader>
          <TableBody>
            {beanNutritionFacts.map((fact, index) => (
              <TableRow key={index}>
                <TableCell className="text-gray-700">{fact.name}</TableCell>
                <TableCell className="text-gray-700">{fact.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <h3 className="text-2xl font-bold text-gray-900">Common Uses of Beans</h3>
        <ul className="list-disc pl-6 space-y-4 text-gray-700">
          {beanUses.map((use, index) => (
            <li key={index} className="text-lg">
              {use}
            </li>
          ))}
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg mt-8">
          <p className="font-semibold text-xl text-gray-800">Did You Know?</p>
          <p className="text-lg text-gray-700 mt-2">Beans are not only affordable and easy to prepare, but they also offer long-lasting energy due to their slow-digesting carbohydrates.</p>
        </div>
      </div>
    </div>
  );
}
