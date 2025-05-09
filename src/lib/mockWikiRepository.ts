import { WikiRepository } from "./repositories";

/**
 * Mock implementation of WikiRepository that simulates fetching content from Azure DevOps Wiki
 */
export class MockWikiRepository implements WikiRepository {
  private wikiContent: Record<string, string> = {
    "ai-image-generator": `
# AI Image Generator

## Overview
This project utilizes OpenAI's DALL-E model to generate images from natural language descriptions. Users can enter text prompts, and the AI will create corresponding images in various styles.

## Technical Details
The application uses a React frontend that communicates with a Next.js API route, which then forwards requests to the OpenAI API. Generated images are cached to reduce API costs and improve performance.

## Key Features
- Text-to-image generation using advanced AI models
- Multiple style options (photorealistic, cartoon, abstract, etc.)
- Image history and favorites for registered users
- Batch generation with variations
- Download images in various formats and resolutions

## Future Plans
- Add image editing capabilities
- Implement fine-tuning on custom datasets
- Add sharing options and community galleries
    `,
    "blockchain-voting-app": `
# Blockchain Voting App

## Overview
This application provides a secure, transparent voting system using Ethereum blockchain technology. It ensures that votes cannot be tampered with and allows for public verification of results.

## Technical Details
The app consists of Solidity smart contracts deployed to the Ethereum testnet, a React frontend, and a Node.js server for user authentication and blockchain interaction via Web3.js.

## Key Features
- Secure, tamper-proof voting using blockchain technology
- Real-time vote counting and results display
- Vote verification through cryptographic proofs
- Voter anonymity protection
- Compatible with MetaMask and other Ethereum wallets

## Security Measures
- zk-SNARKs for voter privacy
- Multi-signature authorization for administrative actions
- Gas optimization for cost-effective voting
    `,
    "ar-fitness-coach": `
# AR Fitness Coach

## Overview
The AR Fitness Coach is an immersive workout experience that uses augmented reality to guide users through personalized exercise routines. It provides real-time feedback on form and technique.

## Technical Details
Built with Unity and ARKit/ARCore, the application uses computer vision to track body movements and machine learning to assess exercise form. It runs natively on iOS and Android devices with AR capabilities.

## Key Features
- Real-time pose estimation and form correction
- Customized workout plans based on fitness level
- Virtual trainer demonstrations of exercises
- Progress tracking and fitness analytics
- Social sharing and challenges with friends

## User Experience
The app creates an engaging workout environment by overlaying virtual elements on the real world. Users can see virtual trainers performing exercises alongside them, receive visual cues for proper form, and track their progress in 3D space.
    `,
  };

  async getProjectWikiContent(projectSlug: string): Promise<string | null> {
    // Simulate API latency
    await new Promise((resolve) => setTimeout(resolve, 300));

    return this.wikiContent[projectSlug] || null;
  }
}
