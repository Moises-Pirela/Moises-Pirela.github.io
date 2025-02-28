
class BlogPost {
    constructor(id, title, date, preview, content, image, tags = []) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.preview = preview;
        this.content = content;
        this.image = image || `assets/images/blog-placeholder.svg`;
        this.tags = tags;
        this.url = `blog-post.html?id=${id}`;
    }
    
    toCard() {
        return `
            <div class="blog-card">
                <div class="blog-image" style="background-image: url('${this.image}');">
                    <div class="blog-overlay">
                        <a href="${this.url}" class="cta-button">Read More</a>
                    </div>
                </div>
                <div class="blog-content">
                    <div class="blog-date">${this.date}</div>
                    <h3 class="blog-title">${this.title}</h3>
                    <p class="blog-preview">${this.preview}</p>
                    <div class="blog-tags">
                        ${this.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <a href="${this.url}" class="cta-button read-more">Read Article</a>
                </div>
            </div>
        `;
    }
}

// Blog manager
class BlogManager {
    constructor() {
        this.posts = [];
        this.postsLoaded = false;
        this.currentPost = null;
    }
    
    async init() {
        if (window.location.pathname.includes('blog-post.html')) {
            await this.loadPosts();
            const urlParams = new URLSearchParams(window.location.search);
            const postId = urlParams.get('id');
            
            if (postId) {
                await this.displaySinglePost(postId);
            } else {
                window.location.href = 'index.html#blog';
            }
        } else if (window.location.pathname.includes('blog-archive.html')) {
            await this.loadPosts();
        } else {
            await this.loadPosts();
            this.displayBlogPreviews();
        }
    }
    
    async loadPosts() {
        
        if (this.postsLoaded) return;
        
            
            const postData = [
                {
                    "id": "responsive-game-physics",
                    "title": "Implementing Responsive Game Physics",
                    "date": "January 15, 2025",
                    "preview": "One of the most challenging aspects of gameplay engineering is creating physics systems that feel natural and responsive without sacrificing performance.",
                    "content": "# Implementing Responsive Game Physics\n\nOne of the most challenging aspects...",
                    "image": "assets/images/physics-blog.svg",
                    "tags": ["Physics", "Game Feel", "Performance"]
                },
                {
                    "id": "adaptive-enemy-ai",
                    "title": "Designing Adaptive Enemy AI",
                    "date": "February 3, 2025",
                    "preview": "Creating challenging but fair enemy AI is a delicate balancing act. Too predictable, and players get bored; too difficult, and they get frustrated.",
                    "content": "# Designing Adaptive Enemy AI\n\nCreating challenging but fair enemy AI is a delicate balancing act. Too predictable, and players get bored; too difficult, and they get frustrated. In this article, I'll explore techniques for creating enemy AI that adapts to player skill and provides a consistently engaging experience.\n\n## The Problem with Static Difficulty\n\nTraditional difficulty settings (Easy, Normal, Hard) have several drawbacks:\n\n1. Players don't always know which setting is right for them\n2. Player skill improves throughout the game, making early challenges too easy later\n3. Different players excel at different aspects of gameplay\n\nAn adaptive AI system can address these issues by dynamically adjusting to the player's performance.\n\n## Key Components of Adaptive AI\n\n### 1. Performance Measurement\n\nBefore AI can adapt, it needs to know how the player is performing. Consider tracking:\n\n* Hit/miss ratio\n* Damage taken vs. damage dealt\n* Completion time for objectives\n* Resource management efficiency\n* Deaths per encounter\n\n### 2. Adjustment Vectors\n\nOnce you've measured performance, the AI needs ways to adjust. Some effective vectors include:\n\n* **Aggression Level**: How often enemies attack and how coordinated they are\n* **Tactical Awareness**: How effectively enemies use cover and positioning\n* **Reaction Time**: How quickly enemies respond to player actions\n* **Resource Efficiency**: How intelligently enemies use limited resources like ammo\n* **Pattern Variation**: How predictable enemy attack patterns are\n\n```\n// Example adjustment function (pseudocode)\nfunction AdjustAIDifficulty(enemy, playerPerformanceScore) {\n    // Scale from 0.5 (easy) to 1.5 (hard) based on player performance\n    let difficultyScale = 0.5 + (playerPerformanceScore * 1.0);\n    \n    // Apply to various parameters\n    enemy.reactionTime = baseReactionTime / difficultyScale;\n    enemy.accuracyVariance *= (2 - difficultyScale);\n    enemy.usesTactics = (difficultyScale > 0.8);\n    enemy.usesCoordination = (difficultyScale > 1.0);\n}\n```\n\n### 3. Subtle Implementation\n\nThe key to good adaptive difficulty is subtlety. Players should never feel that the game is \"letting them win\" or unfairly spiking in difficulty.\n\nTips for subtle implementation:\n* Adjust parameters gradually over time\n* Include some randomness to mask the adaptation\n* Focus on changing behavior rather than just changing stats\n* Ensure consistent enemy \"personality\" despite adaptations\n\n## Real-World Examples\n\nLet's look at how some games have implemented adaptive AI successfully:\n\n### Left 4 Dead's AI Director\n\nValve's AI Director system monitors player performance and dynamically adjusts:\n* Enemy spawn rates and locations\n* Special enemy types\n* Resource placement\n* Music and atmosphere\n\n### Halo's Combat\n\nHalo's enemies adapt by:\n* Taking more/less aggressive positioning\n* Using stronger/weaker tactics when flanking\n* Adjusting grenade usage frequency\n* Changing how they utilize vehicles\n\n## Implementation Approach\n\nWhen implementing adaptive AI, I recommend starting with a \"rubber band\" system that:\n\n1. Establishes an ideal success rate (e.g., player wins 60-70% of encounters)\n2. Gradually increases difficulty when players exceed this rate\n3. Gradually decreases difficulty when players fall below this rate\n4. Maintains invisible minimum and maximum difficulty bounds\n\nThe goal is to keep players in the \"flow channel\" - challenged but not overwhelmed.\n\n## Conclusion\n\nAdaptive enemy AI creates more engaging player experiences by providing appropriate challenges regardless of skill level. By measuring performance, adjusting along multiple vectors, and implementing changes subtly, you can create enemies that feel intelligent and responsive to player actions.\n\nRemember: The goal isn't to defeat the player but to provide an engaging experience that makes victory satisfying.",
                    "image": "assets/images/ai-blog.svg",
                    "tags": [
                        "AI",
                        "Game Design",
                        "Player Experience"
                    ]
                },
                {
                    "id": "optimizing-game-performance",
                    "title": "Optimizing Game Performance",
                    "date": "February 22, 2025",
                    "preview": "As games become more complex, performance optimization becomes increasingly critical. Here are some insights about data structures that can dramatically impact performance.",
                    "content": "# Optimizing Game Performance: Data Structures Matter\n\nAs games become more complex, performance optimization becomes increasingly critical. Many developers focus on algorithmic optimizations, but the choice of data structures can have an equally dramatic impact on performance. In this article, I'll explore how thoughtful data structure selection can significantly improve your game's performance.\n\n## Memory Access Patterns\n\nModern CPUs are incredibly fast, but memory access is often the bottleneck. Understanding how data is stored and accessed is crucial for optimization.\n\n### Cache Coherence\n\nCPUs use a hierarchical memory system with multiple cache levels. Accessing data that's already in cache is orders of magnitude faster than fetching from main memory.\n\nTechniques to improve cache coherence:\n1. **Use contiguous memory layouts** (arrays instead of linked lists)\n2. **Process data in the same order it's stored**\n3. **Keep related data together** (struct of arrays vs. array of structs)\n\n```cpp\n// Poor cache coherence (AoS - Array of Structs)\nstruct GameObject {\n    Vector3 position;\n    Quaternion rotation;\n    Vector3 scale;\n    Mesh* mesh;\n    Material* material;\n    // Many other properties...\n};\nGameObject gameObjects[1000];\n\n// Better cache coherence for position updates (SoA - Struct of Arrays)\nstruct GameObjectData {\n    Vector3 positions[1000];\n    Quaternion rotations[1000];\n    Vector3 scales[1000];\n    Mesh* meshes[1000];\n    Material* materials[1000];\n    // ...\n};\n```\n\n## Data-Oriented Design\n\nData-Oriented Design (DOD) is a programming paradigm that prioritizes efficient data processing over object hierarchies.\n\n### Entity Component System (ECS)\n\nECS is a popular architectural pattern that separates:\n* **Entities** (just IDs)\n* **Components** (pure data)\n* **Systems** (logic that processes components)\n\nBenefits for performance:\n* Components of the same type are stored together (cache-friendly)\n* Systems can process only the components they need\n* Enables efficient parallelization\n\n```cpp\n// Simplified ECS example\nvoid MovementSystem::Update(float deltaTime) {\n    // Process all entities with both Position and Velocity components\n    for (auto entity : registry.view<Position, Velocity>()) {\n        Position& pos = registry.get<Position>(entity);\n        const Velocity& vel = registry.get<Velocity>(entity);\n        \n        // Cache-friendly: processing position data sequentially\n        pos.x += vel.x * deltaTime;\n        pos.y += vel.y * deltaTime;\n        pos.z += vel.z * deltaTime;\n    }\n}\n```\n\n## Specialized Data Structures\n\nSometimes standard containers don't fit your specific needs. Here are some specialized data structures that can significantly improve game performance:\n\n### Spatial Partitioning\n\nFor games with large worlds, brute-force collision detection quickly becomes unviable. Spatial partitioning structures help by organizing objects by their location.\n\nOptions include:\n* **Grid-based**: Simple and fast for uniformly distributed objects\n* **Quadtree/Octree**: Adaptive subdivision for uneven distributions\n* **Bounding Volume Hierarchies (BVH)**: Excellent for static geometry\n\n### Object Pools\n\nCreating and destroying objects frequently can lead to memory fragmentation and performance spikes. Object pools pre-allocate a fixed number of objects and recycle them.\n\nBenefits:\n* Eliminates allocation/deallocation overhead\n* Reduces memory fragmentation\n* Makes memory usage more predictable\n\n```cpp\ntemplate <typename T>\nclass ObjectPool {\nprivate:\n    std::vector<T> objects;\n    std::vector<bool> active;\n    \npublic:\n    ObjectPool(size_t size) : objects(size), active(size, false) {}\n    \n    T* Acquire() {\n        for (size_t i = 0; i < active.size(); i++) {\n            if (!active[i]) {\n                active[i] = true;\n                objects[i] = T(); // Reset to default state\n                return &objects[i];\n            }\n        }\n        return nullptr; // Pool exhausted\n    }\n    \n    void Release(T* object) {\n        size_t index = object - &objects[0];\n        active[index] = false;\n    }\n};\n```\n\n### Ring Buffers\n\nRing buffers (circular buffers) are excellent for scenarios with fixed-size FIFO requirements, like audio sample processing or network packet queuing.\n\n## Profiling and Measurement\n\nAlways profile before optimizing. Modern tools can help identify:\n* Cache misses\n* Memory allocation patterns\n* Data access patterns\n\nPopular profiling tools:\n* Valgrind/Callgrind\n* Intel VTune\n* Visual Studio Profiler\n* Chrome Tracing (for custom instrumentation)\n\n## Conclusion\n\nChoosing the right data structures and organizing your data efficiently can lead to dramatic performance improvements in games. Remember these key principles:\n\n1. Optimize for cache coherence\n2. Consider data-oriented design approaches\n3. Use specialized data structures for specific problems\n4. Always measure performance before and after changes\n\nPerformance optimization is an ongoing process throughout development. By making smart choices about data structures early on, you can build a solid foundation that scales well as your game grows in complexity.",
                    "image": "assets/images/performance-blog.svg",
                    "tags": [
                        "Optimization",
                        "Data Structures",
                        "Performance"
                    ]
                },

                {
                    "id": "skewed-grid-astar-pathfinding",
                    "title": "Building a Skewed Grid System for 2D Beat 'Em Ups",
                    "date": "February 28, 2025",
                    "preview": "",
                    "content": "# Building a Skewed Grid System for 2D Beat 'Em Ups\n\n![Beat Em Up Grid System](https://api.placeholder.com/800/400)\n\n## Introduction\n\nCreating a compelling 2D beat 'em up requires more than just flashy combat animations and responsive controls. The spatial navigation system that underpins enemy AI and player movement is equally crucial for gameplay that feels both fluid and fair. In this post, I'll dive deep into implementing a skewed grid system that handles the pseudo-3D perspective common in traditional beat 'em ups.\n\nUnlike regular grid systems, our implementation handles non-rectangular play areas and supports specialized pathfinding with multiple movement permissions based on entity type. Let's explore how to build this system from the ground up.\n\n## The Challenge of Skewed Perspective\n\nBeat 'em ups typically use a skewed perspective to create the illusion of depth. Characters can move not just left and right, but also \"up\" and \"down\" within the scene. This presents unique challenges:\n\n1. The play area is often trapezoidal rather than rectangular\n2. Movement needs to align with the visual perspective\n3. Different entity types may have different movement permissions\n4. Collision handling must account for the skewed perspective\n\n## Core Components\n\nOur solution consists of several key components:\n\n- A customizable grid configuration system\n- Cell types with varying permissions\n- Entity tracking through spatial partitioning\n- Perspective-aware collision resolution\n- Visual debugging tools\n\nLet's break these down one by one.\n\n## Setting Up the Grid Structure\n\nOur grid is defined by four points that form a quadrilateral, allowing for non-rectangular play areas that match the game's perspective.\n\n```csharp\n[Serializable]\npublic struct CellConfig\n{\n    public Vector2 point1; // Bottom-left\n    public Vector2 point2; // Bottom-right\n    public Vector2 point3; // Top-left\n    public Vector2 point4; // Top-right\n}\n```\n\nEach cell in our grid can have different properties:\n\n```csharp\npublic enum CellType\n{\n    WALKABLE,     // All entities can move here\n    NON_WALKABLE, // No entities can move here\n    AI_WALKABLE,  // Only AI entities can move here\n}\n```\n\nThis allows for interesting level design, such as areas only accessible to certain enemies or barriers only affecting the player.\n\n## Coordinate Conversions\n\nOne of the trickiest aspects is converting between world coordinates and grid coordinates. Let's look at how we handle this:\n\n```csharp\npublic int GetCellIndex(Vector3 worldPosition)\n{\n    Vector3 p1 = ToXZ(cellConfig.point1);\n    Vector3 p2 = ToXZ(cellConfig.point2);\n    Vector3 p3 = ToXZ(cellConfig.point3);\n    Vector3 p4 = ToXZ(cellConfig.point4);\n\n    Vector3 gridX = p2 - p1;\n    Vector3 gridZ = p3 - p1;\n    Vector3 normal = Vector3.Cross(gridX, gridZ).normalized;\n\n    // Project the world position onto the grid plane\n    Plane gridPlane = new Plane(normal, p1);\n    Vector3 projectedPos = gridPlane.ClosestPointOnPlane(worldPosition);\n\n    // Calculate the relative position in the grid\n    Vector3 fullGridX = p2 - p1; // Bottom edge\n    Vector3 fullGridZ = p3 - p1; // Left edge\n\n    Vector3 relativePos = projectedPos - p1;\n    float denominator = fullGridX.x * fullGridZ.z - fullGridX.z * fullGridZ.x;\n\n    if (Mathf.Abs(denominator) < 0.001f)\n    {\n        Debug.LogWarning(\"Grid is degenerate or too small for accurate mapping.\");\n        return 0;\n    }\n\n    // Calculate UV coordinates in the grid\n    float u = (relativePos.x * fullGridZ.z - relativePos.z * fullGridZ.x) / denominator;\n    float v = (relativePos.z * fullGridX.x - relativePos.x * fullGridX.z) / denominator;\n\n    // Convert to grid coordinates\n    int x = Mathf.FloorToInt(u * cellsX);\n    int z = Mathf.FloorToInt(v * cellsZ);\n\n    // Clamp to valid range\n    x = Mathf.Clamp(x, 0, cellsX - 1);\n    z = Mathf.Clamp(z, 0, cellsZ - 1);\n\n    return x + z * cellsX;\n}\n```\n\nWe're using a parametric approach to handle the non-rectangular grid. By calculating the UV coordinates within our quadrilateral, we can determine which cell contains any given world position.\n\n## Implementing Entity Tracking\n\nFor efficient collision detection and AI decision-making, we need to track which entities occupy which cells. We accomplish this with a spatial partitioning system:\n\n```csharp\n// Each cell contains a list of entity IDs\npublic List<int>[] entityMap;\n\n// When an entity moves to a new cell\nif (newCellIndex != actor.currentSpatialCell)\n{\n    // Remove from old cell\n    if (actor.currentSpatialCell != -1)\n        grid.entityMap[actor.currentSpatialCell].Remove(actor.ActorId);\n\n    // Add to new cell\n    if (grid.entityMap[newCellIndex] == null)\n    {\n        grid.entityMap[newCellIndex] = new List<int>();\n    }\n    \n    grid.entityMap[newCellIndex].Add(actor.ActorId);\n    actor.currentSpatialCell = newCellIndex;\n}\n```\n\nThis system allows us to quickly determine which entities are near each other, which is essential for both combat and pathfinding.\n\n## Smart Collision Resolution\n\nWhen an entity attempts to move into a blocked cell, we need to handle the collision intelligently. Rather than just stopping the entity, we implement a sliding behavior that feels natural:\n\n```csharp\nprivate Vector3 CalculateSlideAlongEdge(UnityActor actor, Vector3 startPos, Vector3 intendedPos, LevelSectionGrid grid, int intendedCellIndex)\n{\n    // Get current cell\n    int currentCellIndex = grid.GetCellIndex(startPos);\n    \n    // Calculate movement along grid axes\n    Vector3 movementVector = intendedPos - startPos;\n    float movementAlongX = Vector3.Dot(movementVector, gridXAxis);\n    float movementAlongZ = Vector3.Dot(movementVector, gridZAxis);\n    \n    // Try to slide along valid neighboring cells\n    if (Mathf.Abs(movementAlongX) > Mathf.Abs(movementAlongZ))\n    {\n        Vector3 positionAfterXMove = startPos + gridXAxis * movementAlongX;\n        int cellAfterXMove = grid.GetCellIndex(positionAfterXMove);\n        if (IsMoveValidForActor(actor, cellAfterXMove))\n        {\n            return positionAfterXMove;\n        }\n    }\n    else\n    {\n        Vector3 positionAfterZMove = startPos + gridZAxis * movementAlongZ;\n        int cellAfterZMove = grid.GetCellIndex(positionAfterZMove);\n        if (IsMoveValidForActor(actor, cellAfterZMove))\n        {\n            return positionAfterZMove;\n        }\n    }\n    \n    return startPos;\n}\n```\n\nThis allows characters to slide along walls rather than getting stuck, creating more fluid movement.\n\n## Implementing A* Pathfinding\n\nWith our grid system in place, implementing A* pathfinding becomes straightforward. Here's a simplified implementation:\n\n```csharp\npublic List<int> FindPath(int startCellIndex, int targetCellIndex, ActorType actorType)\n{\n    var openSet = new PriorityQueue<int, float>();\n    var closedSet = new HashSet<int>();\n    var cameFrom = new Dictionary<int, int>();\n    var gScore = new Dictionary<int, float>();\n    var fScore = new Dictionary<int, float>();\n    \n    openSet.Enqueue(startCellIndex, 0);\n    gScore[startCellIndex] = 0;\n    fScore[startCellIndex] = HeuristicCost(startCellIndex, targetCellIndex);\n    \n    while (openSet.Count > 0)\n    {\n        int current = openSet.Dequeue();\n        \n        if (current == targetCellIndex)\n            return ReconstructPath(cameFrom, current);\n            \n        closedSet.Add(current);\n        \n        foreach (int neighbor in GetNeighbors(current))\n        {\n            if (closedSet.Contains(neighbor))\n                continue;\n                \n            if (!IsCellValidForActorType(neighbor, actorType))\n                continue;\n                \n            float tentativeGScore = gScore[current] + \n                Vector3.Distance(GetCellCenter(current), GetCellCenter(neighbor));\n                \n            if (!gScore.ContainsKey(neighbor) || tentativeGScore < gScore[neighbor])\n            {\n                cameFrom[neighbor] = current;\n                gScore[neighbor] = tentativeGScore;\n                fScore[neighbor] = gScore[neighbor] + HeuristicCost(neighbor, targetCellIndex);\n                \n                if (!openSet.Contains(neighbor))\n                    openSet.Enqueue(neighbor, fScore[neighbor]);\n            }\n        }\n    }\n    \n    return new List<int>(); // No path found\n}\n\nprivate float HeuristicCost(int fromIndex, int toIndex)\n{\n    Vector3 fromPos = GetCellCenter(fromIndex);\n    Vector3 toPos = GetCellCenter(toIndex);\n    return Vector3.Distance(fromPos, toPos);\n}\n\nprivate List<int> ReconstructPath(Dictionary<int, int> cameFrom, int current)\n{\n    var path = new List<int> { current };\n    while (cameFrom.ContainsKey(current))\n    {\n        current = cameFrom[current];\n        path.Insert(0, current);\n    }\n    return path;\n}\n```\n\nThe key here is that we check if each cell is valid for the specific actor type, allowing different entities to have different path options.\n\n## Visual Debugging\n\nDebugging a spatial system can be challenging without proper visualization. Let's implement debug rendering for our grid:\n\n```csharp\n#if UNITY_EDITOR\npublic void DrawGrid(Color color)\n{\n    Vector3 p1 = ToXZ(cellConfig.point1);\n    Vector3 p2 = ToXZ(cellConfig.point2);\n    Vector3 p3 = ToXZ(cellConfig.point3);\n\n    Vector3 gridXDir = (p2 - p1).normalized;\n    Vector3 gridZDir = (p3 - p1).normalized;\n\n    float cellWidth = GetCellWidth();\n    float cellDepth = GetCellDepth();\n\n    for (int x = 0; x < cellsX; x++)\n    {\n        for (int z = 0; z < cellsZ; z++)\n        {\n            int i = x + z * cellsX;\n            Vector3 cellOrigin = p1 + gridXDir * (x * cellWidth) + gridZDir * (z * cellDepth);\n\n            // Draw cell edges\n            Vector3[] vertices = new Vector3[4];\n            vertices[0] = cellOrigin;\n            vertices[1] = cellOrigin + gridXDir * cellWidth;\n            vertices[2] = cellOrigin + gridZDir * cellDepth;\n            vertices[3] = cellOrigin + gridXDir * cellWidth + gridZDir * cellDepth;\n\n            Handles.color = color;\n            Handles.DrawLine(vertices[0], vertices[1]);\n            Handles.DrawLine(vertices[0], vertices[2]);\n            Handles.DrawLine(vertices[1], vertices[3]);\n            Handles.DrawLine(vertices[2], vertices[3]);\n\n            // Draw cell type indicator\n            Vector3 cellCenter = cellOrigin + gridXDir * (cellWidth * 0.5f) + gridZDir * (cellDepth * 0.5f);\n            Handles.color = CELL_COLOR[(int)cells[i].cellType];\n            Handles.DrawWireCube(cellCenter, Vector3.one * 0.25f);\n            \n            // Draw entity count when in play mode\n            if (Application.isPlaying && entityMap != null && entityMap.Length > i)\n            {\n                var entityList = entityMap[i];\n                int count = (entityList == null) ? 0 : entityList.Count;\n                Handles.Label(cellCenter + Vector3.up, count.ToString());\n            }\n        }\n    }\n}\n#endif\n```\n\nThis provides a clear visual representation of the grid, cell types, and entity positions during development and debugging.\n\n## Performance Considerations\n\nWhile our implementation is robust, there are some performance aspects to consider:\n\n1. **Grid Size**: Smaller cells provide more precision but increase computational cost\n2. **Entity Updates**: Only update entity positions when they've moved a significant distance\n3. **Path Caching**: Consider caching pathfinding results for frequently used paths\n4. **Spatial Optimization**: Only check for interactions between entities in neighboring cells\n\nThe provided code already includes some of these optimizations:\n\n```csharp\n// Only update position if the entity has moved significantly\nif ((actor.Position - actor.previousPosition).sqrMagnitude <= 0.01f) continue;\n```\n\n## Putting It All Together\n\nBy combining these components, we've created a complete spatial system for a 2D beat 'em up that handles:\n\n- Skewed perspective grids\n- Different movement permissions for different entity types\n- Efficient entity tracking\n- Smooth collision resolution\n- Visual debugging\n\nThis system provides a solid foundation for implementing game mechanics like enemy AI, combat range detection, and environmental hazards.\n\n## Next Steps\n\nWith our grid system in place, consider expanding it with:\n\n1. **Path Smoothing**: Reduce the \"zigzag\" effect in A* paths\n2. **Dynamic Obstacles**: Allow cells to change type during gameplay\n3. **Hierarchical Pathfinding**: Improve performance for long-distance paths\n4. **Zone-Based AI**: Create patrol and ambush zones using cell groups\n\n## Conclusion\n\nA well-implemented grid system forms the backbone of any quality beat 'em up game. By handling the unique challenges of skewed perspective and providing robust spatial tracking, our implementation enables both fluid gameplay and intelligent AI behavior.\n\nThe code provided gives you a starting point that you can adapt to your specific game's needs. Happy coding, and may your beat 'em up enemies navigate wisely!\n\n---\n\n*What spatial systems have you implemented in your 2D games? Share your experiences in the comments below!*",
                    "image": "assets/images/grid-blog.svg",
                    "tags": [
                        "Pathfinding",
                        "Game Architecture",
                        "Grid Systems",
                    ]
                }
            ]
            
            // Create BlogPost objects
            this.posts = postData.map(post => new BlogPost(
                post.id,
                post.title,
                post.date,
                post.preview,
                post.content,
                post.image,
                post.tags
            ));
            
            this.postsLoaded = true;
    }
    
    // Load sample posts as fallback
    loadSamplePosts() {
        this.posts = [
            new BlogPost(
                'responsive-game-physics',
                'Implementing Responsive Game Physics',
                'January 15, 2025',
                'One of the most challenging aspects of gameplay engineering is creating physics systems that feel natural and responsive without sacrificing performance.',
                `# Implementing Responsive Game Physics

One of the most challenging aspects of gameplay engineering is creating physics systems that feel natural and responsive without sacrificing performance. In this article, I'll share my approach to building physics systems that players love.

## The Perception Challenge

When implementing game physics, we're not trying to perfectly simulate reality. Instead, we're aiming to create a *perception* of realistic physics that feels satisfying to the player. This is an important distinction that can save you countless hours of optimization work.

### Finding the Right Balance

* **Too Realistic**: Can feel sluggish and unresponsive
* **Too Arcade-like**: Can feel weightless and unsatisfying
* **Just Right**: Responsive but with enough weight to feel substantial

## Core Components of Good Game Physics

### 1. Consistent Frame Rate

Physics calculations need a consistent time step to ensure predictable behavior. I recommend:

* Using a fixed time step for physics updates
* Interpolating visual positions between physics steps
* Implementing frame rate independent motion

\`\`\`
// Example of frame-rate independent motion
Vector3 Move(Vector3 position, Vector3 velocity, float deltaTime) {
    return position + velocity * deltaTime;
}
\`\`\`

### 2. Tunable Parameters

Always expose physics parameters to designers. What feels "right" is subjective and will likely change throughout development.

Key parameters to expose:
* Gravity strength
* Player movement acceleration/deceleration
* Jump height and duration
* Air control
* Friction coefficients

### 3. Responsive Controls

Players expect immediate feedback when they press a button. Even if your character has weight and momentum, the initial response should be instant.

Techniques I use:
* Apply an initial impulse on button press before regular acceleration
* Slightly higher acceleration for initial movement
* Visual feedback (animations, particles) that start immediately

## Implementation Tips

1. **Separate visual and physical representations**
2. **Use prediction for networked physics**
3. **Implement "game feel" adjustments:**
   - Coyote time (allowing jumps slightly after leaving a platform)
   - Jump buffering (queuing a jump input if pressed just before landing)
   - Variable jump height based on button hold duration

Remember that the goal is player satisfaction, not physical accuracy. If it feels good, it *is* good!`,
                'physics-blog.jpg',
                ['Physics', 'Game Feel', 'Performance']
            ),
            new BlogPost(
                'adaptive-enemy-ai',
                'Designing Adaptive Enemy AI',
                'February 3, 2025',
                'Creating challenging but fair enemy AI is a delicate balancing act. Too predictable, and players get bored; too difficult, and they get frustrated.',
                `# Designing Adaptive Enemy AI

Creating challenging but fair enemy AI is a delicate balancing act. Too predictable, and players get bored; too difficult, and they get frustrated. In this article, I'll explore techniques for creating enemy AI that adapts to player skill and provides a consistently engaging experience.

## The Problem with Static Difficulty

Traditional difficulty settings (Easy, Normal, Hard) have several drawbacks:

1. Players don't always know which setting is right for them
2. Player skill improves throughout the game, making early challenges too easy later
3. Different players excel at different aspects of gameplay

An adaptive AI system can address these issues by dynamically adjusting to the player's performance.

## Key Components of Adaptive AI

### 1. Performance Measurement

Before AI can adapt, it needs to know how the player is performing. Consider tracking:

* Hit/miss ratio
* Damage taken vs. damage dealt
* Completion time for objectives
* Resource management efficiency
* Deaths per encounter

### 2. Adjustment Vectors

Once you've measured performance, the AI needs ways to adjust. Some effective vectors include:

* **Aggression Level**: How often enemies attack and how coordinated they are
* **Tactical Awareness**: How effectively enemies use cover and positioning
* **Reaction Time**: How quickly enemies respond to player actions
* **Resource Efficiency**: How intelligently enemies use limited resources like ammo
* **Pattern Variation**: How predictable enemy attack patterns are

\`\`\`
// Example adjustment function (pseudocode)
function AdjustAIDifficulty(enemy, playerPerformanceScore) {
    // Scale from 0.5 (easy) to 1.5 (hard) based on player performance
    let difficultyScale = 0.5 + (playerPerformanceScore * 1.0);
    
    // Apply to various parameters
    enemy.reactionTime = baseReactionTime / difficultyScale;
    enemy.accuracyVariance *= (2 - difficultyScale);
    enemy.usesTactics = (difficultyScale > 0.8);
    enemy.usesCoordination = (difficultyScale > 1.0);
}
\`\`\`

### 3. Subtle Implementation

The key to good adaptive difficulty is subtlety. Players should never feel that the game is "letting them win" or unfairly spiking in difficulty.

Tips for subtle implementation:
* Adjust parameters gradually over time
* Include some randomness to mask the adaptation
* Focus on changing behavior rather than just changing stats
* Ensure consistent enemy "personality" despite adaptations

## Real-World Examples

Let's look at how some games have implemented adaptive AI successfully:

### Left 4 Dead's AI Director

Valve's AI Director system monitors player performance and dynamically adjusts:
* Enemy spawn rates and locations
* Special enemy types
* Resource placement
* Music and atmosphere

### Halo's Combat

Halo's enemies adapt by:
* Taking more/less aggressive positioning
* Using stronger/weaker tactics when flanking
* Adjusting grenade usage frequency
* Changing how they utilize vehicles

## Implementation Approach

When implementing adaptive AI, I recommend starting with a "rubber band" system that:

1. Establishes an ideal success rate (e.g., player wins 60-70% of encounters)
2. Gradually increases difficulty when players exceed this rate
3. Gradually decreases difficulty when players fall below this rate
4. Maintains invisible minimum and maximum difficulty bounds

The goal is to keep players in the "flow channel" - challenged but not overwhelmed.

## Conclusion

Adaptive enemy AI creates more engaging player experiences by providing appropriate challenges regardless of skill level. By measuring performance, adjusting along multiple vectors, and implementing changes subtly, you can create enemies that feel intelligent and responsive to player actions.

Remember: The goal isn't to defeat the player but to provide an engaging experience that makes victory satisfying.`,
                'ai-blog.jpg',
                ['AI', 'Game Design', 'Player Experience']
            ),
            new BlogPost(
                'optimizing-game-performance',
                'Optimizing Game Performance',
                'February 22, 2025',
                'As games become more complex, performance optimization becomes increasingly critical. Here are some insights about data structures that can dramatically impact performance.',
                `# Optimizing Game Performance: Data Structures Matter

As games become more complex, performance optimization becomes increasingly critical. Many developers focus on algorithmic optimizations, but the choice of data structures can have an equally dramatic impact on performance. In this article, I'll explore how thoughtful data structure selection can significantly improve your game's performance.

## Memory Access Patterns

Modern CPUs are incredibly fast, but memory access is often the bottleneck. Understanding how data is stored and accessed is crucial for optimization.

### Cache Coherence

CPUs use a hierarchical memory system with multiple cache levels. Accessing data that's already in cache is orders of magnitude faster than fetching from main memory.

Techniques to improve cache coherence:
1. **Use contiguous memory layouts** (arrays instead of linked lists)
2. **Process data in the same order it's stored**
3. **Keep related data together** (struct of arrays vs. array of structs)

\`\`\`cpp
// Poor cache coherence (AoS - Array of Structs)
struct GameObject {
    Vector3 position;
    Quaternion rotation;
    Vector3 scale;
    Mesh* mesh;
    Material* material;
    // Many other properties...
};
GameObject gameObjects[1000];

// Better cache coherence for position updates (SoA - Struct of Arrays)
struct GameObjectData {
    Vector3 positions[1000];
    Quaternion rotations[1000];
    Vector3 scales[1000];
    Mesh* meshes[1000];
    Material* materials[1000];
    // ...
};
\`\`\`

## Data-Oriented Design

Data-Oriented Design (DOD) is a programming paradigm that prioritizes efficient data processing over object hierarchies.

### Entity Component System (ECS)

ECS is a popular architectural pattern that separates:
* **Entities** (just IDs)
* **Components** (pure data)
* **Systems** (logic that processes components)

Benefits for performance:
* Components of the same type are stored together (cache-friendly)
* Systems can process only the components they need
* Enables efficient parallelization

\`\`\`cpp
// Simplified ECS example
void MovementSystem::Update(float deltaTime) {
    // Process all entities with both Position and Velocity components
    for (auto entity : registry.view<Position, Velocity>()) {
        Position& pos = registry.get<Position>(entity);
        const Velocity& vel = registry.get<Velocity>(entity);
        
        // Cache-friendly: processing position data sequentially
        pos.x += vel.x * deltaTime;
        pos.y += vel.y * deltaTime;
        pos.z += vel.z * deltaTime;
    }
}
\`\`\`

## Specialized Data Structures

Sometimes standard containers don't fit your specific needs. Here are some specialized data structures that can significantly improve game performance:

### Spatial Partitioning

For games with large worlds, brute-force collision detection quickly becomes unviable. Spatial partitioning structures help by organizing objects by their location.

Options include:
* **Grid-based**: Simple and fast for uniformly distributed objects
* **Quadtree/Octree**: Adaptive subdivision for uneven distributions
* **Bounding Volume Hierarchies (BVH)**: Excellent for static geometry

### Object Pools

Creating and destroying objects frequently can lead to memory fragmentation and performance spikes. Object pools pre-allocate a fixed number of objects and recycle them.

Benefits:
* Eliminates allocation/deallocation overhead
* Reduces memory fragmentation
* Makes memory usage more predictable

\`\`\`cpp
template <typename T>
class ObjectPool {
private:
    std::vector<T> objects;
    std::vector<bool> active;
    
public:
    ObjectPool(size_t size) : objects(size), active(size, false) {}
    
    T* Acquire() {
        for (size_t i = 0; i < active.size(); i++) {
            if (!active[i]) {
                active[i] = true;
                objects[i] = T(); // Reset to default state
                return &objects[i];
            }
        }
        return nullptr; // Pool exhausted
    }
    
    void Release(T* object) {
        size_t index = object - &objects[0];
        active[index] = false;
    }
};
\`\`\`

### Ring Buffers

Ring buffers (circular buffers) are excellent for scenarios with fixed-size FIFO requirements, like audio sample processing or network packet queuing.

## Profiling and Measurement

Always profile before optimizing. Modern tools can help identify:
* Cache misses
* Memory allocation patterns
* Data access patterns

Popular profiling tools:
* Valgrind/Callgrind
* Intel VTune
* Visual Studio Profiler
* Chrome Tracing (for custom instrumentation)

## Conclusion

Choosing the right data structures and organizing your data efficiently can lead to dramatic performance improvements in games. Remember these key principles:

1. Optimize for cache coherence
2. Consider data-oriented design approaches
3. Use specialized data structures for specific problems
4. Always measure performance before and after changes

Performance optimization is an ongoing process throughout development. By making smart choices about data structures early on, you can build a solid foundation that scales well as your game grows in complexity.`,
                'performance-blog.jpg',
                ['Optimization', 'Data Structures', 'Performance']
            )
        ];
        
        this.postsLoaded = true;
    }
    
    // Display blog previews on main page
    displayBlogPreviews() {
        const blogGrid = document.querySelector('.blog-grid');
        if (!blogGrid) return;
        
        // Clear existing content
        blogGrid.innerHTML = '';
        
        // Add blog cards
        this.posts.forEach(post => {
            blogGrid.innerHTML += post.toCard();
        });
    }
    
    // Display a single blog post
    async displaySinglePost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) {
            // Post not found, redirect to blog
            window.location.href = 'index.html#blog';
            return;
        }
        
        this.currentPost = post;
        
        // Update page title
        document.title = `${post.title} - Moises Pirela`;
        
        // Get blog content container
        const blogContentElement = document.getElementById('blog-post-content');
        if (!blogContentElement) return;
        
        // Set header info
        const blogHeader = document.getElementById('blog-post-header');
        if (blogHeader) {
            blogHeader.innerHTML = `
                <h1>${post.title}</h1>
                <div class="blog-post-meta">
                    <span class="blog-post-date">${post.date}</span>
                    <div class="blog-post-tags">
                        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
        }
        
        // Set featured image if available
        const blogImage = document.getElementById('blog-post-image');
        if (blogImage && post.image) {
            blogImage.style.backgroundImage = `url('${post.image}')`;
        }
        
        // Render markdown content
        const renderedContent = markdownParser.parse(post.content);
        blogContentElement.innerHTML = renderedContent;
        
        // Setup related posts
        this.displayRelatedPosts(post);
    }
    
    // Display related posts
    displayRelatedPosts(currentPost) {
        const relatedPostsContainer = document.getElementById('related-posts');
        if (!relatedPostsContainer) return;
        
        // Get up to 3 related posts based on shared tags
        const relatedPosts = this.posts
            .filter(post => post.id !== currentPost.id) // Exclude current post
            .map(post => {
                // Count matching tags
                const matchingTags = post.tags.filter(tag => currentPost.tags.includes(tag));
                return {
                    post,
                    matchCount: matchingTags.length
                };
            })
            .filter(item => item.matchCount > 0) // Only include posts with at least one matching tag
            .sort((a, b) => b.matchCount - a.matchCount) // Sort by number of matching tags
            .slice(0, 2) // Take top 2
            .map(item => item.post);
        
        // If we don't have enough related posts, add some recent posts
        if (relatedPosts.length < 2) {
            const recentPosts = this.posts
                .filter(post => post.id !== currentPost.id && !relatedPosts.some(p => p.id === post.id))
                .slice(0, 2 - relatedPosts.length);
            
            relatedPosts.push(...recentPosts);
        }
        
        // Generate HTML for related posts
        relatedPostsContainer.innerHTML = '<h3>Related Articles</h3><div class="related-posts-grid"></div>';
        const grid = relatedPostsContainer.querySelector('.related-posts-grid');
        
        relatedPosts.forEach(post => {
            grid.innerHTML += post.toCard();
        });
    }
}

// Initialize blog when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.blogManager = new BlogManager();
    window.blogManager.init();
});