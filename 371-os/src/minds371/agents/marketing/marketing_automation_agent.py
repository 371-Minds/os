from __future__ import annotations
import uuid
from dataclasses import dataclass, field
from datetime import datetime, timedelta
from enum import Enum
from typing import Any, Dict, List, Optional

# --- Enums for Type Definitions ---

class ContentType(Enum):
    BLOG_ARTICLE = "blog_article"
    SOCIAL_MEDIA_POST = "social_media_post"
    EMAIL_NEWSLETTER = "email_newsletter"
    AD_COPY = "ad_copy"

class PlatformType(Enum):
    WEBSITE = "website"
    BLOG = "blog"
    MEDIUM = "medium"
    SUBSTACK = "substack"

class SocialPlatform(Enum):
    TWITTER = "Twitter"
    LINKEDIN = "LinkedIn"
    FACEBOOK = "Facebook"
    INSTAGRAM = "Instagram"

class PostType(Enum):
    TEXT = "text"
    IMAGE = "image"
    VIDEO = "video"
    POLL = "poll"

class EmailType(Enum):
    PROMOTIONAL = "promotional"
    NEWSLETTER = "newsletter"
    TRANSACTIONAL = "transactional"

class SegmentType(Enum):
    ALL_USERS = "all_users"
    NEW_SUBSCRIBERS = "new_subscribers"
    ACTIVE_USERS = "active_users"
    LAPSED_CUSTOMERS = "lapsed_customers"

# --- Data Structures for Content and Campaigns ---

@dataclass
class GeneratedContent:
    content_id: str
    content_type: ContentType
    platform: PlatformType
    title: str
    body: str
    meta_data: Dict[str, Any]
    created_at: datetime
    approval_status: str = "pending"

@dataclass
class ContentRequest:
    content_type: ContentType
    topic: str
    target_audience: str
    brand_voice: str
    keywords: List[str]
    context: Dict[str, Any]
    platform: PlatformType
    length: int
    call_to_action: str

@dataclass
class SocialPost:
    content: str
    platforms: List[SocialPlatform]
    post_id: str = field(default_factory=lambda: f"post_{uuid.uuid4().hex[:10]}")
    post_type: PostType = PostType.TEXT
    hashtags: List[str] = field(default_factory=list)
    scheduled_time: Optional[datetime] = None
    is_published: bool = False

@dataclass
class EmailContact:
    email: str
    first_name: str
    last_name: str
    segments: List[SegmentType]

@dataclass
class EmailTemplate:
    template_id: str
    name: str
    email_type: EmailType
    subject_line: str
    html_content: str
    text_content: str
    variables: List[str]

@dataclass
class EmailCampaign:
    campaign_id: str
    name: str
    email_type: EmailType
    template_id: str
    target_segments: List[SegmentType]
    send_time: datetime
    personalization_rules: Dict[str, Any]

@dataclass
class Task:
    id: str
    agent_type: str
    description: str
    payload: Dict[str, Any]

# --- Mock Systems (to be replaced by real implementations) ---

class AIContentCreator:
    async def generate_content(self, request: ContentRequest) -> GeneratedContent:
        # This would call a real AI model endpoint
        return GeneratedContent(
            content_id=f"content_{datetime.now().timestamp()}",
            content_type=request.content_type,
            platform=request.platform,
            title=f"AI Title for {request.topic}",
            body=f"This is AI-generated content about {request.topic}.",
            meta_data={"keywords": request.keywords},
            created_at=datetime.now(),
            approval_status="pending"
        )

class MultiPlatformPublisher:
    async def publish_post(self, post: SocialPost) -> Dict[SocialPlatform, bool]:
        # This would integrate with social media APIs
        print(f"Publishing post '{post.content[:30]}...' to {', '.join([p.value for p in post.platforms])}")
        return {platform: True for platform in post.platforms}

class EmailDeliveryEngine:
    async def send_email(self, recipient: EmailContact, subject: str, html_content: str, campaign_id: str) -> bool:
        # This would integrate with an email service provider like SendGrid or Mailchimp
        print(f"Sending email '{subject}' to {recipient.email}")
        return True

# --- Sub-systems of the Marketing Agent ---

class ContentGenerationSystem:
    def __init__(self, ai_endpoint: str):
        self.ai_creator = AIContentCreator()

    async def generate(self, request_data: dict) -> GeneratedContent:
        request = ContentRequest(**request_data)
        return await self.ai_creator.generate_content(request)

class SocialMediaSystem:
    def __init__(self, platform_settings: Dict[SocialPlatform, Any]):
        self.settings = platform_settings
        self.publisher = MultiPlatformPublisher()
        self._scheduled_posts: List[SocialPost] = []

    async def schedule_post(self, post_data: dict) -> SocialPost:
        post = SocialPost(**post_data)
        # Default scheduling logic: 8 AM next day
        now = datetime.now()
        scheduled_time = (now + timedelta(days=1)).replace(hour=8, minute=0, second=0, microsecond=0)
        post.scheduled_time = scheduled_time
        self._scheduled_posts.append(post)
        return post

    def get_scheduled_posts(self) -> List[SocialPost]:
        return self._scheduled_posts

class EmailMarketingSystem:
    def __init__(self, provider_config: Dict[str, Any]):
        self.config = provider_config
        self.delivery_engine = EmailDeliveryEngine()
        self._contacts: List[EmailContact] = []
        self._templates: Dict[str, EmailTemplate] = {}

    def add_contact(self, contact: EmailContact):
        self._contacts.append(contact)

    def create_template(self, template: EmailTemplate):
        self._templates[template.template_id] = template

    async def send_campaign(self, campaign_data: dict) -> Dict[str, Any]:
        campaign = EmailCampaign(**campaign_data)
        template = self._templates.get(campaign.template_id)
        if not template:
            raise ValueError(f"Template {campaign.template_id} not found.")

        target_contacts = [
            c for c in self._contacts if any(s in c.segments for s in campaign.target_segments)
        ]

        sent_count = 0
        for contact in target_contacts:
            subject = template.subject_line
            html_content = template.html_content
            # Basic personalization
            for key, value in campaign.personalization_rules.items():
                subject = subject.replace(f"{{{{{key}}}}}", str(value))
                html_content = html_content.replace(f"{{{{{key}}}}}", str(value))

            html_content = html_content.replace("{{first_name}}", contact.first_name)

            await self.delivery_engine.send_email(contact, subject, html_content, campaign.campaign_id)
            sent_count += 1

        return {
            "campaign_id": campaign.campaign_id,
            "sent_count": sent_count,
            "delivered_count": sent_count, # Mock assumption
            "opened_count": 0,
            "clicked_count": 0,
            "unsubscribed_count": 0,
            "bounced_count": 0,
            "spam_count": 0,
            "timestamp": datetime.now()
        }

# --- Main Agent Class ---

class MarketingAutomationAgent:
    def __init__(
        self,
        agent_id: str,
        ai_endpoint: str,
        brand_guidelines: Dict[str, Any],
        platform_settings: Dict[SocialPlatform, Any],
        email_provider_config: Dict[str, Any],
    ):
        self.agent_id = agent_id
        self.agent_type = "MarketingAutomationAgent"
        self.brand_guidelines = brand_guidelines

        self.content_generation_system = ContentGenerationSystem(ai_endpoint)
        self.social_media_system = SocialMediaSystem(platform_settings)
        self.email_marketing_system = EmailMarketingSystem(email_provider_config)

    async def process_task(self, task: Task) -> Dict[str, Any]:
        action = task.payload.get("action")
        if not action:
            raise ValueError("Task payload must contain an 'action' key.")

        if action == "generate_content":
            request_data = task.payload["request"]
            content = await self.content_generation_system.generate(request_data)
            return {"content_id": content.content_id, "status": "success"}

        elif action == "schedule_social_post":
            post_data = task.payload["post"]
            post = await self.social_media_system.schedule_post(post_data)
            return {"post_id": post.post_id, "status": "scheduled"}

        elif action == "send_email_campaign":
            campaign_data = task.payload["campaign"]
            # Add contacts and templates for the campaign
            contact = EmailContact(
                email="test.subscriber@example.com",
                first_name="Test",
                last_name="Subscriber",
                segments=[SegmentType.NEW_SUBSCRIBERS]
            )
            self.email_marketing_system.add_contact(contact)

            template = EmailTemplate(
                template_id="template_001",
                name="New Blog Post",
                email_type=EmailType.NEWSLETTER,
                subject_line="New Post: {{title}}",
                html_content="<h1>{{title}}</h1><p>Hi {{first_name}}, check out our new blog post!</p>",
                text_content="New Post: {{title}}. Hi {{first_name}}, check it out!",
                variables=["title", "first_name"]
            )
            self.email_marketing_system.create_template(template)

            metrics = await self.email_marketing_system.send_campaign(campaign_data)
            return {"metrics": metrics, "status": "success"}

        else:
            raise ValueError(f"Unknown action: {action}")
