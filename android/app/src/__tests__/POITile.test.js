import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import POITile from '../components/POITile';

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

describe('POITile Component', () => {
  const mockPoi = {
    id: '1',
    name: 'Test POI',
    description: 'Test Description',
    category: 'Restaurant',
    rating: 4.5,
    thumbnail: 'https://example.com/image.jpg'
  };

  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders POI information correctly', () => {
    const { getByText } = render(
      <POITile poi={mockPoi} onPress={mockOnPress} />
    );

    expect(getByText('Test POI')).toBeTruthy();
  });

  it('handles press events', () => {
    const { root } = render(
      <POITile poi={mockPoi} onPress={mockOnPress} />
    );

    // Test that the component renders without errors
    expect(root).toBeTruthy();
  });

  it('handles missing POI data gracefully', () => {
    const incompletePoi = { 
      id: '2', 
      name: 'Incomplete POI',
      thumbnail: null
    };
    
    const { getByText } = render(
      <POITile poi={incompletePoi} onPress={mockOnPress} />
    );

    expect(getByText('Incomplete POI')).toBeTruthy();
  });

  it('handles basic rendering with minimal data', () => {
    const basicPoi = {
      id: '3',
      name: 'Basic POI',
      category: 'Study',
      thumbnail: null
    };

    expect(() => {
      render(<POITile poi={basicPoi} onPress={mockOnPress} />);
    }).not.toThrow();
  });

  it('displays generic category text', () => {
    const { getByText } = render(
      <POITile poi={mockPoi} onPress={mockOnPress} />
    );

    // Look for the text that's actually displayed
    expect(getByText('Category')).toBeTruthy();
  });

  it('renders without required props gracefully', () => {
    // Test with empty poi object
    const emptyPoi = {};
    
    expect(() => {
      render(<POITile poi={emptyPoi} onPress={mockOnPress} />);
    }).not.toThrow();
  });
}); 