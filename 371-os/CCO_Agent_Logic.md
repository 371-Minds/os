graph TD
    subgraph "CCO Agent: Community Health Monitoring"
        Start((Start Monitoring)) --> CheckHealth{Check Community Health Score};
        CheckHealth -- "Score > 0.8 (Healthy)" --> Wait[Wait 1 Hour];
        Wait --> CheckHealth;
        
        CheckHealth -- "Score <= 0.8 (Warning)" --> AnalyzeSentiment[Analyze Recent Posts for Negative Sentiment];
        AnalyzeSentiment --> CreateTask[Create 'Review Community Health' Issue in YouTrack];
        CreateTask --> NotifyCEO[Notify CEO Agent of Warning Status];
        NotifyCEO --> End((Monitoring Cycle Complete));
    end```

 
