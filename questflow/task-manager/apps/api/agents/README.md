How This Fits Together

Code-MERN Agent → turns OpenAPI into MERN stack code/tests.

Code-T3 Agent → scaffolds T3 (Next.js/Prisma) features from specs.

QA Agent → runs Jest + Cucumber tests against your API + specs.

Deploy Agent → handles Akash deployment automation.

All agents:

Load specs from /specs/

Run inside Nx monorepo (npx nx serve <agent>)

Can be extended to integrate with Warp/Qoder or other AI coders.
