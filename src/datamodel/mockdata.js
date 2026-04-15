// datamodel/mockdata.js - Initial mock data for volatile datamodels

export const mockPhotos = [
  { id: 'photo-1', content: 'https://images.unsplash.com/photo-1596700548171-893f41249964' },
  { id: 'photo-2', content: 'https://images.unsplash.com/photo-1490226462744-848e025805e2' },
]

export const mockPosts = [
  {
    build_id: 'build-1',
    user_name: 'builder@example.com',
    likes: 42,
    shares: 6,
    description: 'Finished my custom street kart! Black and red all the way.',
    comments: [
      { id: 'build-1-comment-1', user_name: 'layth@example.com', text: 'Looks awesome!' },
      { id: 'build-1-comment-2', user_name: 'admin@kartbuilder.com', text: 'Great color setup.' },
    ],
  },
  {
    build_id: 'build-2',
    user_name: 'admin@kartbuilder.com',
    likes: 128,
    shares: 14,
    description: 'Looking forward to the weekend championship. Are you ready?',
    comments: [
      { id: 'build-2-comment-1', user_name: 'builder@example.com', text: 'Can’t wait for race day.' },
    ],
  },
  {
    build_id: 'build-3',
    user_name: 'layth@example.com',
    likes: 15,
    shares: 2,
    description: 'First time out on the track. What a thrill!',
    comments: [],
  },
]

export const mockTypes = [
  { name: 'Cross Kart' },
  { name: 'Street Kart' },
  { name: 'Race Kart' },
  { name: 'Junior Kart' },
  { name: 'Pro Kart' },
  { name: 'Daily Kart' },
]

export const mockCommentPosts = [
  { id: 'cp-1', user_name: 'admin@kartbuilder.com', text: 'Looking slick!', rating: 9 },
  { id: 'cp-2', user_name: 'layth@example.com', text: 'Where did you get the frame?', rating: 8 },
]

export const mockCommentSuppliers = [
  { comment_id: 'cs-1', user_name: 'builder@example.com', text: 'Fast delivery, highly recommend.', rating: 5 },
  { comment_id: 'cs-2', user_name: 'layth@example.com', text: 'Had some issues with shipping delays.', rating: 3 },
]

// Mock Users
export const mockUsers = [
  {
    first_name: 'Admin',
    last_name: 'User',
    email: 'admin@kartbuilder.com',
    password: 'admin123',
    type: 'admin',
    xpBadge: 'Expert',
    xpPoints: 5000,
  },
  {
    first_name: 'Builder',
    last_name: 'Pro',
    email: 'builder@example.com',
    password: 'builder123',
    type: 'user',
    xpBadge: 'Intermediate',
    xpPoints: 2500,
  },
  {
    first_name: 'Layth',
    last_name: 'Racer',
    email: 'layth@example.com',
    password: 'layth123',
    type: 'user',
    xpBadge: 'Beginner',
    xpPoints: 1000,
  },
  {
    first_name: 'Parts',
    last_name: 'Supplier',
    email: 'supplier@kartparts.com',
    password: 'supplier123',
    type: 'supplier',
    xpBadge: 'Expert',
    xpPoints: 3500,
  },
]

// Mock Orders
export const mockOrders = [
  {
    orderID: 'order-001',
    buildID: 'build-1',
    userName: 'builder@example.com',
    price: 2499.99,
    buildTool: 'KartBuilder Pro',
    status: 'complete',
    delivery: 'air',
    payment: 'gpay',
    address: {
      country: 'USA',
      region: 'California',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
      phone: '555-0001',
    },
    items: [
      { id: 'p-001', name: 'Rotax 125 MAX Engine', price: 1299.99 },
      { id: 'p-007', name: 'Tony Kart Frame 401R', price: 899.99 },
    ],
    createdAt: '2026-03-15T10:30:00Z',
  },
  {
    orderID: 'order-002',
    buildID: 'build-2',
    userName: 'admin@kartbuilder.com',
    price: 1899.99,
    buildTool: 'KartBuilder Pro',
    status: 'pending',
    delivery: 'sea',
    payment: 'card',
    address: {
      country: 'USA',
      region: 'Florida',
      city: 'Miami',
      state: 'FL',
      zip: '33101',
      phone: '555-0002',
    },
    items: [
      { id: 'p-002', name: 'IAME X30 Engine', price: 1099.99 },
      { id: 'p-005', name: 'OTK Front Brake System', price: 249.99 },
    ],
    createdAt: '2026-03-20T14:45:00Z',
  },
]

// Mock Designs
export const mockDesigns = [
  {
    buildID: 'build-1',
    buildName: 'Street Beast',
    type: 'Street Kart',
    parts: ['p-001', 'p-007', 'p-005', 'p-003', 'p-009', 'p-011'],
    userID: 'builder@example.com',
    price: 2499.99,
    createdAt: '2026-03-10T08:00:00Z',
  },
  {
    buildID: 'build-2',
    buildName: 'Championship Racer',
    type: 'Race Kart',
    parts: ['p-002', 'p-008', 'p-006', 'p-004', 'p-010', 'p-012'],
    userID: 'admin@kartbuilder.com',
    price: 2199.99,
    createdAt: '2026-03-12T11:20:00Z',
  },
  {
    buildID: 'build-3',
    buildName: 'Cross Country Explorer',
    type: 'Cross Kart',
    parts: ['p-001', 'p-008', 'p-005', 'p-003', 'p-009', 'p-011'],
    userID: 'layth@example.com',
    price: 2349.99,
    createdAt: '2026-03-14T09:15:00Z',
  },
]

// Mock Suppliers
export const mockSuppliers = [
  {
    supplierID: 's-001',
    name: 'KartParts Pro',
    email: 'supplier@kartparts.com',
    certified: true,
  },
  {
    supplierID: 's-002',
    name: 'Racing Depot',
    email: 'sales@racingdepot.com',
    certified: true,
  },
  {
    supplierID: 's-003',
    name: 'SpeedGear Supply',
    email: 'info@speedgear.com',
    certified: false,
  },
]

// Mock Parts
export const mockParts = [
  {
    ID: 'p-001',
    name: 'Rotax 125 MAX Engine',
    type: 'engine',
    image: 'rotax-125-max-engine.jpg',
    price: 1299.99,
    description: 'High-performance 125cc single-cylinder engine.',
    serialNumber: 'SN-ROT001',
    compatibility: true,
    availability: true,
    supplier: 's-001',
  },
  {
    ID: 'p-002',
    name: 'IAME X30 Engine',
    type: 'engine',
    image: 'iame-x30-engine.jpg',
    price: 1099.99,
    description: 'Reliable 125cc racing engine.',
    serialNumber: 'SN-IAM001',
    compatibility: true,
    availability: true,
    supplier: 's-002',
  },
  {
    ID: 'p-003',
    name: 'MG Yellow Slick Tires',
    type: 'wheel',
    image: 'mg-yellow-slick-tires.jpg',
    price: 199.99,
    description: 'Soft compound slick tires for dry tracks.',
    serialNumber: 'SN-MGY001',
    compatibility: true,
    availability: true,
    supplier: 's-001',
  },
  {
    ID: 'p-004',
    name: 'Vega XH Tires',
    type: 'wheel',
    image: 'vega-xh-tires.jpg',
    price: 149.99,
    description: 'Versatile all-condition tires.',
    serialNumber: 'SN-VEG001',
    compatibility: true,
    availability: false,
    supplier: 's-003',
  },
  {
    ID: 'p-005',
    name: 'OTK Front Brake System',
    type: 'brake',
    image: 'otk-front-brake-system.jpg',
    price: 249.99,
    description: 'Hydraulic front brake with high bite.',
    serialNumber: 'SN-OTK001',
    compatibility: true,
    availability: true,
    supplier: 's-001',
  },
  {
    ID: 'p-006',
    name: 'Brembo Rear Caliper',
    type: 'brake',
    image: 'brembo-rear-caliper.jpg',
    price: 189.99,
    description: 'Rear-mount caliper, compatible with most frames.',
    serialNumber: 'SN-BRE001',
    compatibility: false,
    availability: true,
    supplier: 's-002',
  },
  {
    ID: 'p-007',
    name: 'Tony Kart Frame 401R',
    type: 'frame',
    image: 'tony-kart-frame-401r.jpg',
    price: 899.99,
    description: 'Lightweight chromoly steel racing frame.',
    serialNumber: 'SN-TON001',
    compatibility: true,
    availability: true,
    supplier: 's-001',
  },
  {
    ID: 'p-008',
    name: 'CRG Black Steel Frame',
    type: 'frame',
    image: 'crg-black-steel-frame.jpg',
    price: 749.99,
    description: 'Durable steel frame for endurance karting.',
    serialNumber: 'SN-CRG001',
    compatibility: true,
    availability: false,
    supplier: 's-002',
  },
  {
    ID: 'p-009',
    name: 'Tillett T11 Race Seat',
    type: 'seat',
    image: 'tillett-t11-seat.jpg',
    price: 149.99,
    description: 'Fibreglass racing seat with side pods.',
    serialNumber: 'SN-TIL001',
    compatibility: true,
    availability: true,
    supplier: 's-001',
  },
  {
    ID: 'p-010',
    name: 'OMP KS-2 Seat',
    type: 'seat',
    image: 'omp-ks2-seat.jpg',
    price: 129.99,
    description: 'Entry-level comfort seat.',
    serialNumber: 'SN-OMP001',
    compatibility: true,
    availability: true,
    supplier: 's-003',
  },
  {
    ID: 'p-011',
    name: 'OTK Steering Wheel',
    type: 'steering',
    image: 'otk-steering-wheel.png',
    price: 89.99,
    description: 'Ergonomic 300mm diameter steering wheel.',
    serialNumber: 'SN-OTS001',
    compatibility: true,
    availability: true,
    supplier: 's-001',
  },
  {
    ID: 'p-012',
    name: 'Mychron Column Kit',
    type: 'steering',
    image: 'mychron-column-kit.jpg',
    price: 59.99,
    description: 'Adjustable steering column with quick-release hub.',
    serialNumber: 'SN-MYC001',
    compatibility: false,
    availability: true,
    supplier: 's-002',
  },
]
